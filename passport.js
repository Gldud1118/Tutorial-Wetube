import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); //어떤 정보를 쿠키에게 주느냐 그리고 어떤 필드가 쿠키에 포함될 것인지 알려주는 역할을 함
passport.deserializeUser(User.deserializeUser()); //전송받은 쿠키의 정보를 어떻게 사용자로 전환하는가를 의미
