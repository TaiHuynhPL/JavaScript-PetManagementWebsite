"use strict";

const loginmodalBlookEl = document.querySelector("#login-modal");
const maincontentBlookEl = document.querySelector("#main-content");
const welcomemessageEl = document.querySelector("#welcome-message");
const logoutBtn = document.querySelector("#btn-logout");

//Nếu đã đăng nhập
if (currentUser) {
  //ẩn khối login modal
  loginmodalBlookEl.style.display = "none";
  //hiển thị nội dung đúng với tên tài khoản đăng nhập
  welcomemessageEl.textContent = `Welcome ${currentUser.firstname}`;
} else {
  //nếu chưa đăng nhập thì ẩn khối maincontent
  maincontentBlookEl.style.display = "none";
}

//Sự kiện click vào nút logout
logoutBtn.addEventListener("click", function () {
  //Xóa currentUser ở local storage
  localStorage.removeItem("currentUser");
  //Trở lại trang đăng nhập
  window.location.href = "./pages/login.html";
});
