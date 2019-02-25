import express from "express";
import routes from "../routes";
import {
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  userDetail
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

export default userRouter;
