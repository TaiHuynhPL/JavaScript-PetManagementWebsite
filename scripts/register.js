"use strict";

const fisrtNameInput = document.querySelector("#input-firstname");
const lastNameInput = document.querySelector("#input-lastname");
const userNameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const passwordConfirmInput = document.querySelector("#input-password-confirm");
const submitBtn = document.querySelector("#btn-submit");

//Hàm xóa giá trị form input
const clearInput = function () {
  fisrtNameInput.value = "";
  lastNameInput.value = "";
  userNameInput.value = "";
  passwordInput.value = "";
  passwordConfirmInput.value = "";
};

//Sự kiện click vào nút Register
submitBtn.addEventListener("click", function () {
  //Người dùng chưa nhập đầy đủ thông tin
  if (
    !fisrtNameInput.value ||
    !lastNameInput.value ||
    !userNameInput.value ||
    !passwordInput.value ||
    !passwordConfirmInput.value
  ) {
    alert("bạn phải nhận đầy đủ thông tin!");
    //Người dùng đăng ký trùng với tên username đã có
  } else if (userArr.map((u) => u.username).includes(userNameInput.value)) {
    alert("username đã có, vui lòng nhập username khác!");
    //Người dùng nhập mật khẩu có từ 8 ký tự trở xuống
  } else if (passwordInput.value.length <= 8) {
    alert("Mật khẩu phải có nhiều hơn 8 ký tự");
    //Người dùng nhập ô xác nhận mật khẩu chưa khớp
  } else if (passwordInput.value !== passwordConfirmInput.value) {
    alert("xác nhận mật khẩu chưa khớp");
    //Sau khi thỏa mãn tất cả điều kiện, tiến hành xử lý dữ liệu:
  } else {
    //Tạo 1 user mới có class là User
    const user = new User(
      fisrtNameInput.value,
      lastNameInput.value,
      userNameInput.value,
      passwordInput.value
    );
    //Thêm user mới vào mảng user đã lấy ra từ trước(ở storage)
    userArr.push(user);
    //Lưu mảng user mới trở lại storage
    saveToStorage(KEY, JSON.stringify(userArr));
    //Thông báo cho người dùng biết đã đăng ký thành công
    alert("Đăng ký tài khoản thành công !");
    //Xóa các dữ liệu nhập vào của form input
    clearInput();
    //Chuyển sang giao diện đăng nhập
    window.location.href = "../pages/login.html";
  }
});
