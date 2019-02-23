import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.set("view engine", "pug"); //템플릿 엔진으로 pug사용
app.use("/uploads", express.static("uploads")); //디렉토리에서 파일을 보내주는 middleware

app.use(cookieParser()); //request객체에 cookies속성이 부여된다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(helmet());

app.use(
  //세션은 우리가 가진 쿠키를 해독함 실제 ID가 passport로 넘어가게 된다.
  //passport로 넘겨지면, deserialzeUser라는 함수가 실행된다. deserialize가 실행되면 passport는 방금 찾은 그 사용자를 middleware나 routes의 request object에 할당한다.
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
    // cookie: { maxAge: 120000 } //만료일자를 추가
  })
);
//한번 인증된 클라이언트는 서버에서 받은 세션 아이디를 쿠키 등에 저장해 놓고 있음

app.use(passport.initialize());
app.use(passport.session()); //passport를 통해서 session을 이용하는데, 즉 세션이 가진 쿠키를 이용한다는 것을 의미

app.use(localsMiddleware); //순서가 중요하다.

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
