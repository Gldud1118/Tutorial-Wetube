export const home = (req, res) => res.render("home");

export const search = (req, res) => res.render("search");

export const getUpload = (req, res) => res.render("upload");
export const postUpload = (req, res) => res.render("upload");

export const videoDetail = (req, res) => res.render("videoDetail");

export const getEditVideo = (req, res) => res.render("editVideo");
export const postEditVideo = (req, res) => res.render("editVideo");

export const getDeleteVideo = (req, res) => res.send("delete video");
export const postDeleteVideo = (req, res) => res.send("delete video");
