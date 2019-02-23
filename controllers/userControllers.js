export const getJoin = (req, res) => res.render("join");
export const postJoin = (req, res) => {
  res.redirect("/");
};
export const getLogin = (req, res) => res.render("login");
export const postLogin = (req, res) => res.render("login");
export const logout = (req, res) => res.send("logout");

export const userDetail = (req, res) => res.render("userDetail");

export const getEditProfile = (req, res) => res.send("editProfile");

export const postEditProfile = (req, res) => res.send("editProfile");

export const getChangePassword = (req, res) => res.send("changePassword");

export const postChangePassword = (req, res) => res.send("changePassword");
