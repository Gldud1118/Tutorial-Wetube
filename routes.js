//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Video
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit"; //만약 컨트롤러에서 어떤 data를 가지고 있다는 것을 표현하고싶으면 더블콜론(:)과 이름을 넣으면 된다.
const DELETE_VIDEO = "/:id/delete";

//API

const API = "/api";
const REGISTER_VIEW = "/:id/view"; //템플릿을 렌더링하지 않는다.
const ADD_COMMENT = "/:id/comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT
};

export default routes;
