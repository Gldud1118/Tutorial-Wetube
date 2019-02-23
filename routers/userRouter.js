import express from "express";
import routes from "../routes";
import {
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  userDetail
} from "../controllers/userControllers";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail, onlyPrivate, userDetail);

export default userRouter;
