import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (err) {
    console.log(err);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => res.render("search");

export const getUpload = (req, res) => res.render("upload");

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });

  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);

    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (err) {
    console.log(err);
    res.render(routes.home);
  }
};

export const getEditVideo = (req, res) => res.render("editVideo");
export const postEditVideo = (req, res) => res.render("editVideo");

export const getDeleteVideo = (req, res) => res.send("delete video");
export const postDeleteVideo = (req, res) => res.send("delete video");
