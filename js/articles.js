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

      articlesData.forEach((article) => {
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
