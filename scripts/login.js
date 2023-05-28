"use strict";

const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const submitBtn = document.querySelector("#btn-submit");

//Sự kiện click vào button login
submitBtn.addEventListener("click", function () {
  //kiểm tra có nhập đầy đủ thông tin chưa
  if (!usernameInput.value || !passwordInput.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
  }
  //kiểm tra username có tạo chưa(có đúng user hay ko)
  else if (!userArr.map((u) => u.username).includes(usernameInput.value)) {
    alert("username chưa đúng");
  }
  // Nếu đúng user thì tiếp tục kiểm tra mật khẩu có khớp hay ko
  else {
    //Tìm vị trí(index) của user đang đăng nhập ở đâu trong mảng user đã được đăng ký(ở storage)
    const i = userArr
      .map((u) => u.username)
      .findIndex((n) => n === usernameInput.value);
    //Nếu mật khẩu nhập không đúng với mật khẩu đã đăng ký
    if (userArr[i].password !== passwordInput.value) {
      alert("Mật khẩu không chính xác!");
      //Nếu nhập đúng mật khẩu
    } else {
      //Lưu tên tài khoản hiện tại vào biến
      // currentUser = usernameInput.value;
      currentUser = userArr[i];
      //Lưu tài khoản hiện tại xuống storage
      saveToStorage("currentUser", JSON.stringify(currentUser));
      //Thông báo cho người dùng đã đăng nhập thành công
      alert("Đăng nhập thành công !");
      //Chuyển sang giao diện trang chủ
      window.location.href = "../index.html";
    }
  }
});
