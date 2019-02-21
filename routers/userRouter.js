import express from "express";
import routes from "../routes";
import {
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  userDetail
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, postEditProfile);

userRouter.get(routes.changePassword, getChangePassword);
userRouter.post(routes.changePassword, postChangePassword);

userRouter.get(routes.userDetail, userDetail);

export default userRouter;
