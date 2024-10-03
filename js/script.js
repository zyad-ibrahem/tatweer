const searchInp = document.getElementById("searchInp");
searchInp.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const data = { search: searchInp.value };
    const queryString = new URLSearchParams(data).toString();
    window.location.href = `search.html?${queryString}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/courses.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((coursesData) => {
      const coursesContainer = document.getElementById("courses-container");

      // ترتيب الدورات بناءً على id (تنازلي) واختيار أعلى 3
      const topCourses = coursesData.sort((a, b) => b.id - a.id).slice(0, 3);

      topCourses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        const data = {
          courseId: course.id,
          courseName: course.name,
          courseDescription: course.description,
        };
        const queryString = new URLSearchParams(
          data
        ).toString();

        courseCard.innerHTML = `
                <img src="${course.image.src}" alt="${course.image.alt}" class="course-image">
                <div class="header-description">
                  <a href="courses-lessons.html?${queryString}">${course.name}</a>
                </div>
        `;

        coursesContainer.appendChild(courseCard);
      });
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/articles.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((articlesData) => {
      const articlesContainer = document.getElementById("articles-container");

      // ترتيب المقالات بناءً على id (تنازلي) واختيار أعلى 3
      const topArticles = articlesData.sort((a, b) => b.id - a.id).slice(0, 3);

      topArticles.forEach((article) => {
        const articleCard = document.createElement("div");
        articleCard.classList.add("article-card");
        articleCard.dataset.articleId = article.id;
        const data = { articleId: article.id };
        const queryString = new URLSearchParams(data).toString();
        articleCard.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <small>${article.date}</small>
          <a href="article-content.html?${queryString}" class="read-more-btn">اقرأ الآن</a>
        `;

        articlesContainer.appendChild(articleCard);
      });
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
});
