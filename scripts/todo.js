"use strict";

if (!currentUser) {
  alert("Vui lòng đăng nhập trước khi vào todo list của bạn !");
  window.location.href = "../pages/login.html";
}
const taskInput = document.querySelector("#input-task");
const addBtn = document.querySelector("#btn-add");
const todoList = document.querySelector("#todo-list");

//Lấy mảng task công việc được lưu ở storage về
const todoArr = JSON.parse(getFromStorage("task") || "[]");

//Lọc để lấy mảng công việc của tài khoản hiện tại
let todoCurrentUserArr = todoArr.filter(
  (t) => t.owner === currentUser.username
);
//Hàm hiển thị todolist
const renderTodoList = function () {
  todoCurrentUserArr = todoArr.filter((t) => t.owner === currentUser.username);
  todoList.innerHTML = "";
  for (let i = 0; i < todoCurrentUserArr.length; i++) {
    const html = document.createElement("div");
    html.innerHTML = `<li${
      todoCurrentUserArr[i].isDone ? ' class="checked"' : ""
    }>${
      todoCurrentUserArr[i].task
    }<span class="close" onclick="deleteTask(${i})">×</span>
    </li>`;
    todoList.appendChild(html);
  }
};
//Chạy hàm để hiển thị lần đầu khi vào trang
renderTodoList();

//Sự kiện thêm task vào todo list
addBtn.addEventListener("click", function () {
  //Điều kiện nếu người chưa nhập
  if (!taskInput.value) {
    alert("Vui lòng nhập nội dung công việc");
  } else {
    //Khai báo 1 object mới từ class Task
    const dataTask = new Task(taskInput.value, currentUser.username, false);
    //Thêm vào mảng obj mới được tạo
    todoArr.push(dataTask);
    //Lưu mảng vào storage
    saveToStorage("task", JSON.stringify(todoArr));
    //Xóa nội dung trong input
    taskInput.value = "";
    //Hiển thị lại danh sách ra giao diện
    renderTodoList();
  }
});

//Sự kiện click vào todo list để toggle task
todoList.addEventListener("click", function (e) {
  //Toggle Task để đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành
  e.target.classList.toggle("checked");
  //Tìm vị trí phần tử mà ta ấn nằm vị trí thứ mấy trong mảng todoArr
  const p = todoArr.findIndex(
    (t) =>
      t.task === e.target.firstChild.textContent &&
      t.owner === currentUser.username
  );
  //Trường hợp click vào nút xóa (x) thì lúc đó p=-1 nên loại trường hợp này
  //và trả lại mặc định ban đầu class của element xóa(vì ở trên(dòng 57) mình đã thêm class checked vào)
  if (p === -1) {
    e.target.classList.toggle("checked");
  }
  //Nếu ko click vào nút xóa, thay đổi dữ liệu và lưu vào storage
  else if (todoArr[p].isDone) {
    todoArr[p].isDone = false;
    saveToStorage("task", JSON.stringify(todoArr));
  } else {
    todoArr[p].isDone = true;
    saveToStorage("task", JSON.stringify(todoArr));
  }
});

//Hàm xóa 1 task
function deleteTask(i) {
  if (confirm("Bạn có chắc chắn xóa không?")) {
    //Tìm vị trí(index) của phần tử người dùng click xóa trong mảng
    const a = todoArr.findIndex((t) => t === todoCurrentUserArr[i]);
    //Xóa phần tử ra khỏi mảng
    todoArr.splice(a, 1);
    //Lưu vào storage
    saveToStorage("task", JSON.stringify(todoArr));
    //Hiển thị lại danh sách công việc ra giao diện
    renderTodoList();
  }
}
