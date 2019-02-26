import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentValue = document.getElementById("jsCommentValue");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const setComment = comment => {
  const html = `
    <li data-comment-id="${comment._id}">
        <a href="#" class="delete__comment" id="jsDeleteComment">삭제</a>
        <div>${comment.text}</div>
    </li>
  `;
  commentList.insertAdjacentHTML("afterbegin", html);
  increaseNumber();
};

const postComment = async comment => {
  let videoId = window.location.href.split("/videos/")[1];
  const lastHash = "#";
  if (videoId.indexOf(lastHash) !== -1) {
    videoId = videoId.replace(lastHash, "");
  }

  if (videoId)
    try {
      const url = `/api/${videoId}/comment`;
      const response = await axios.post(url, {
        comment
      });

      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (err) {
      console.log(err);
    }
};

const handleSubmit = e => {
  e.preventDefault();
  let comment = commentValue.value;
  postComment(comment);
  commentValue.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
