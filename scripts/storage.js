"use strict";

//Hàm sẽ thực hiện việc lưu xuống LocalStorage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};

//Hàm sẽ lấy dữ liệu từ LocalStorage theo Key tương ứng
const getFromStorage = function (key) {
  return localStorage.getItem(key);
};

//Lấy mảng tài khoản đang được lưu dưới storage
const KEY = "USER_ARRAY";
const users = JSON.parse(getFromStorage(KEY) || "[]");

//Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));

//Lấy dữ liệu tài khoản hiện tại đang được lưu dưới storage về
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

//Hàm chuyển từ mảng sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}
