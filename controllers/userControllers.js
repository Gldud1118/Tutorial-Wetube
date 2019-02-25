import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    res.redirect("join", { pagTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });

      await User.register(user, password);
      next();
    } catch (err) {
      console.log(err);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) => res.render("login");

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findById(id).populate("videos");
    console.log(user.videos);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile");
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl //항상 request 객체 안에는 user가 있다
    });

    res.redirect(routes.me);
  } catch (err) {
    res.redirect("editProfile");
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;

  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (err) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
