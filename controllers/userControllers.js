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

export const userDetail = (req, res) => res.render("userDetail");

export const getEditProfile = (req, res) => res.send("editProfile");

export const postEditProfile = (req, res) => res.send("editProfile");

export const getChangePassword = (req, res) => res.send("changePassword");

export const postChangePassword = (req, res) => res.send("changePassword");
