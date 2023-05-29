"use strict";

const newsContainer = document.querySelector("#news-container");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");

if (currentUser) {
  //Đặt biến tổng kết quả bài báo được trả về
  let totalResults = 0;
  //Đặt biến trang đầu tiên khi vào giao diện là 1
  let page = 1;

  //Hàm render bài báo theo trang
  const renderContent = function (articlesArr) {
    //Khai báo biến html ban đầu có chuỗi rỗng
    let html = "";
    //Chạy vòng lặp để lấy nội dung vào html
    for(let i=0; i<articlesArr.length ; i++){
       html += `<div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src="${
                articlesArr[i].urlToImage ? articlesArr[i].urlToImage : "../image/noimg.jpg"
              }"
              class="card-img"
              alt="${articlesArr[i].title}"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                ${articlesArr[i].title ? articlesArr[i].title : "No title"}
              </h5>
              <p class="card-text">
                ${articlesArr[i].description ? articlesArr[i].description : "No description"}
              </p>
                  <a href="${articlesArr[i].url}"
                  class="btn btn-primary" target="_blank"
                  >View</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }
    //Thêm html vừa được ghi mới vào trong phần tử newsContainer
    newsContainer.innerHTML = html;
  };

  //Hàm lấy dữ liệu từ API và hiển thị ra màn hình
  async function getNews(country, page) {
    try {
      //Kết nối với API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=64c65e0187e04548ba806633e1f3c706`
      );
      const data = await res.json();
      //Đặt biến mới để nhận dữ liệu sau đó render dữ liệu này
      const articlesArr = data.articles;
      //Gán biến tổng kết quả bài báo được trả về
      totalResults = data.totalResults;
      renderContent(articlesArr);
      //Hiển thị đúng số trang lên giao diện
      pageNum.textContent = page;
      //Gọi hàm check nút Next để ẩn hoặc hiện nút
      checkBtnNext();
      //Gọi hàm check nút Prev để ẩn hoặc hiện nút
      checkBtnPrev();
    } catch (err) {
      alert("error: " + err.message);
    }
  }

  //Chạy hàm lần đầu khi người dùng vào trang này
  getNews("us", page);

  //Hàm kiểm tra điều kiện để ẩn nút Next
  function checkBtnNext() {
    //Nếu trang hiện tại là trang cuối thì ẩn nút next, hàm ceil để làm tròn lên cho 1 số(kể cả 2.1 cũng làm tròn lên 3)
    if (page == Math.ceil(totalResults / currentUser.pageSize)) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
    }
  }
  //Hàm kiểm tra điều kiện để ẩn nút Prev
  function checkBtnPrev() {
    //Nếu trang hiện tại là 1 thì ẩn nút prev
    if (page == 1) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
    }
  }

  //Sự kiện khi nhấn vào nút prev
  prevBtn.addEventListener("click", function () {
    getNews("us", --page);
  });

  //Sự kiện khi nhấn vào nút next
  nextBtn.addEventListener("click", function () {
    getNews("us", ++page);
  });
} else {
  //Thông báo cho người dùng cần đăng nhập trước khi vào giao diện này
  alert("Vui lòng đăng nhập trước khi xem tin tức !");
  //Chuyển sang giao diện đăng nhập
  window.location.href = "../pages/login.html";
}
