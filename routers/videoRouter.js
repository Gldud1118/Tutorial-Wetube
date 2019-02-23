import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
  getDeleteVideo,
  postDeleteVideo
} from "../controllers/videoControllers";
import { onlyPrivate, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, uploadVideo, onlyPrivate, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo, onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo, onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo, onlyPrivate, getDeleteVideo);
videoRouter.post(routes.deleteVideo, onlyPrivate, postDeleteVideo);

export default videoRouter;
