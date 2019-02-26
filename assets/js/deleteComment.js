import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteCommentHtml = id => {
  const el = document.querySelector(`[data-comment-id="${id}"]`);
  el.parentNode.removeChild(el);
};

const handleDelete = async e => {
  if (e.target.matches("#jsDeleteComment")) {
    const commentId = e.target.parentElement.dataset.commentId;
    let videoId = window.location.href.split("/videos/")[1];
    const lastHash = "#";
    if (videoId.indexOf(lastHash) !== -1) {
      videoId = videoId.replace(lastHash, "");
    }
    try {
      const response = await axios.post(`/api/${commentId}/comment/delete`, {
        id: commentId,
        videoId
      });
      console.log(response);
      if (response.status === 200) {
        deleteCommentHtml(commentId);
        decreaseNumber();
      }
    } catch (err) {
      console.log(err);
    }
  }
};

function init() {
  commentList.addEventListener("click", handleDelete);
}

if (addCommentForm) {
  init();
}
