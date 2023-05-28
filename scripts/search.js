"use strict";

if (currentUser) {
  const queryInput = document.querySelector("#input-query");
  const submitBtn = document.querySelector("#btn-submit");
  const newsContainer = document.querySelector("#news-container");
  const prevBtn = document.querySelector("#btn-prev");
  const nextBtn = document.querySelector("#btn-next");
  const pageNum = document.querySelector("#page-num");

  //Hàm render bài báo theo trang
  const renderContent = function (articlesArr, pageSize, page) {
    //Khai báo biến html ban đầu có chuỗi rỗng
    let html = "";
    //Chạy vòng lặp để ghi nội dung vào html
    for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
      if (articlesArr[i]) {
        html += `<div class="card flex-row flex-wrap">
              <div class="card mb-3" style="">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      src="${
                        articlesArr[i].urlToImage
                          ? articlesArr[i].urlToImage
                          : "../image/noimg.jpg"
                      }"
                      class="card-img"
                      alt="${articlesArr[i].title}"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        ${
                          articlesArr[i].title
                            ? articlesArr[i].title
                            : "No title"
                        }
                      </h5>
                      <p class="card-text">
                        ${
                          articlesArr[i].description
                            ? articlesArr[i].description
                            : "No description"
                        }
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
    }
    //Thêm html vừa được ghi mới vào trong phần tử newsContainer
    newsContainer.innerHTML = html;
  };

  const getNews = async function (input, newspage) {
    //Kết nối API và lấy dữ liệu
    const data = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=64c65e0187e04548ba806633e1f3c706`
    ).then((res) => res.json());

    const articlesArr = data.articles;
    let page = 1;
    renderContent(articlesArr, newspage, page);
    pageNum.textContent = page;
    //Nếu trang hiện tại là 1 thì ẩn nút prev
    if (page === 1) {
      prevBtn.style.display = "none";
    }
    //Nếu trang hiện tại là trang cuối thì ẩn nút next, hàm ceil dùng để làm tròn lên của 1 số thập phân
    if (page === Math.ceil(articlesArr.length / newspage)) {
      nextBtn.style.display = "none";
    }
    //Sự kiện khi nhấn vào nút prev
    prevBtn.addEventListener("click", function () {
      page--;
      if (page === 1) {
        prevBtn.style.display = "none";
      }
      nextBtn.style.display = "block";
      pageNum.textContent = page;
      renderContent(articlesArr, newspage, page);
    });
    //Sự kiện khi nhấn vào nút next
    nextBtn.addEventListener("click", function () {
      page++;
      if (page === Math.ceil(articlesArr.length / newspage)) {
        nextBtn.style.display = "none";
      }
      prevBtn.style.display = "block";
      pageNum.textContent = page;
      renderContent(articlesArr, newspage, page);
    });
  };

  //Sự kiện khi người dùng nhấn nút search
  submitBtn.addEventListener("click", function () {
    //Nếu ô input bỏ trống thì thông báo cho người dùng
    if (!queryInput.value.trim()) {
      alert("Vui lòng nhập thông tin tìm kiếm");
      //Chạy hàm getNews để lấy dữ liệu và hiển thị ra giao diện
    } else {
      getNews(queryInput.value, currentUser.pageSize);
    }
  });
} else {
  //Thông báo cho người dùng đăng nhập trước khi vào trang
  alert("Vui lòng đăng nhập trước khi search tin tức !");
  //Chuyển sang trang đăng nhập
  window.location.href = "../pages/login.html";
}
