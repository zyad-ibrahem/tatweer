document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/articles.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((articlesData) => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const articleId = urlParams.get("articleId")
        ? +urlParams.get("articleId")
        : 0;
      for (let i = 0; i < articlesData.length; i++) {
        if (articlesData[i].id === articleId) {
          const articleTitle = document.getElementById("article-title");
          const articleDiscription = document.getElementById(
            "article-discription"
          );
          const articleContent = document.getElementById("article-content");
          articleContent.innerHTML = articlesData[i].content;
          articleTitle.innerHTML = articlesData[i].title;
          articleDiscription.innerHTML = articlesData[i].description;

          const codeSections = Array.from(
            document.getElementsByClassName("code-section")
          );
          for (let i = 0; i < codeSections.length; i++) {
            let codeLang = codeSections[i].getAttribute("$lang");
            let code = codeSections[i].getAttribute("$code");
            codeSections[i].innerHTML = `
        <div class="lang">${codeLang}<div class="bullte"></div></div>
        <code>
            <button class="copy" onclick="copy(${i})" $id="${i}">انسخ</button>
            <pre class="code" id="${i}"></pre>
          </code>
          `;
            let codePre = document.getElementsByClassName("code")[i];
            codePre.textContent = code;
          }
          function copy(index) {
            let codePre = document.getElementById(index);
            navigator.clipboard.writeText(codePre.textContent);
            window.alert(`✓ تم نسخ`);
          }
          break;
        }
      }
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
});
