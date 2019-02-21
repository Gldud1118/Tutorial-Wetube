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

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail, videoDetail);

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.editVideo, getEditVideo);
videoRouter.post(routes.editVideo, postEditVideo);

videoRouter.get(routes.deleteVideo, getDeleteVideo);
videoRouter.post(routes.deleteVideo, postDeleteVideo);

export default videoRouter;
