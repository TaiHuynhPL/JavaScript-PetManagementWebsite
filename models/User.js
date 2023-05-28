"use strict";

//Class User đại diện cho thông tin người dùng
class User {
  constructor(
    fisrtname,
    lastname,
    username,
    password,
    //mặc định nếu không khai báo thì 2 thuộc tính này sẽ nhận giá trị có sẵn như ở dưới
    pageSize = 10,
    category = "Technology"
  ) {
    this.firstname = fisrtname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    //2 thuộc tính để lưu thông tin trong phần setting cho từng user
    this.pageSize = pageSize;
    this.category = category;
  }
}

//Class Task để chứa các thông tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
