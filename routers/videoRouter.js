import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoControllers";
import { onlyPrivate, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, uploadVideo, onlyPrivate, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
