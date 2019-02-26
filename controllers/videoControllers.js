import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

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
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();

  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); //mongoose.Schema.Types.ObjectId여기에다가만 쓸 수 있음

    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (err) {
    console.log(err);
    res.render(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: "Edit Video", video });
    }
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (err) {
    console.log(err);
  }

  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);

    video.views += 1;
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.end();
  } finally {
    res.end();
  }
};

export const postRegister = (req, res) => {
  res.send("eeee");
};
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });

    video.comments.push(newComment.id);
    video.save();
    res.send(newComment);
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { videoId }
  } = req;

  try {
    await Comment.findByIdAndRemove(id);
    const video = await Video.findById(videoId);

    await video.comments.pull({ _id: id });

    video.save();
  } catch (err) {
    console.log(err);
    res.send(400);
  } finally {
    res.end();
  }
};
