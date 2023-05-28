"use strict";

if (currentUser) {
  const pageSizeInput = document.querySelector("#input-page-size");
  const categoryInput = document.querySelector("#input-category");
  const submitBtn = document.querySelector("#btn-submit");

  //Lấy giá trị đang có của setting hiển thị ra giao diện người dùng
  pageSizeInput.value = currentUser.pageSize;
  categoryInput.value = currentUser.category;

  //Sự kiện khi nhấn vào nút save setting thì sẽ nhận stting mới và được lưu tại storage
  submitBtn.addEventListener("click", function () {
    //Lưu 2 giá trị mới nhập vào tài khoản hiện tại
    currentUser.pageSize = pageSizeInput.value;
    currentUser.category = categoryInput.value;
    //Lưu tài khoản hiện tại mới đưuọc cập nhật về storage
    saveToStorage("currentUser", JSON.stringify(currentUser));
    //Tìm vị trí(index) của tài khoản hiện tại trong mảng tài khoản đã có
    const i = userArr.findIndex((u) => u.username === currentUser.username);
    //Lưu 2 giá trị vừa thay đổi vào mảng tài khoản
    userArr[i].pageSize = pageSizeInput.value;
    userArr[i].category = categoryInput.value;
    //Lưu lại vào storage
    saveToStorage(KEY, JSON.stringify(userArr));
    alert("Cài đặt của bạn đã lưu thành công !");
  });
} else {
  //Thông báo cho người dùng đăng nhập trước khi vào giao diện
  alert("Vui lòng đăng nhập trước khi setting cho tài khoản của bạn !");
  //Trở lại trang đăng nhập
  window.location.href = "../pages/login.html";
}
