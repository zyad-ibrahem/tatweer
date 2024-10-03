document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("courses-container");
  const articlesContainer = document.getElementById("articles-container");

  let coursesData = [];
  let articlesData = [];

  // جلب الدورات من JSON
  fetch("../json/courses.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      coursesData = data;
      return fetchArticles(); // جلب المقالات بعد الدورات
    })
    .then(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const searchValue = urlParams.get("search")
        ? urlParams.get("search").toLowerCase()
        : "";
      document.getElementById("search-span").textContent = searchValue;

      // تصفية وعرض البيانات بناءً على البحث
      const filteredCourses = coursesData.filter((course) =>
        course.name.toLowerCase().includes(searchValue)
      );

      const filteredArticles = articlesData.filter((article) =>
        article.title.toLowerCase().includes(searchValue)
      );

      displayCourses(filteredCourses);
      displayArticles(filteredArticles);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // جلب المقالات من JSON
  function fetchArticles() {
    return fetch("../json/articles.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        articlesData = data;
      });
  }

  // دالة عرض الدورات
  function displayCourses(courses) {
    coursesContainer.innerHTML = "";
    courses.forEach((course) => {
      const courseCard = document.createElement("div");
      courseCard.classList.add("course-card");

      const data = {
        courseId: course.id,
        courseName: course.name,
        courseDescription: course.description,
      };
      const queryString = new URLSearchParams(data).toString();

      courseCard.innerHTML = `
                <img src="${course.image.src}" alt="${course.image.alt}" class="course-image">
                <div class="header-description">
                  <a href="courses-lessons.html?${queryString}">${course.name}</a>
                </div>
            `;
      coursesContainer.appendChild(courseCard);
    });
  }

  // دالة عرض المقالات
  function displayArticles(articles) {
    articlesContainer.innerHTML = "";
    articles.forEach((article) => {
      const articleCard = document.createElement("div");
      articleCard.classList.add("article-card");
      articleCard.dataset.articleId = article.id;
      const data = { articleId: article.id };
      const queryString = new URLSearchParams(data).toString();
      articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="article-content.html?${queryString}" class="enroll-btn">اقرأ الآن</a>
                <span class="article-date">${article.date}</span>
            `;
      articlesContainer.appendChild(articleCard);
    });
  }
});
