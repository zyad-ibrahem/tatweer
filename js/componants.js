document.body.innerHTML = `
  <header id="-mainHeader"></header>
  ${document.body.innerHTML}
  <div id="-goTop" class="go-top">&uarr;</div>
  <footer id="-mainFooter"></footer>
`;
document.getElementById("-mainHeader").innerHTML = `
  <div class="logo">
    <img src="image/logo.svg" alt="logo" class="go-to-home-page" />
    <span class="go-to-home-page">
      أكاديمية
      <br />
      تطوير
    </span>
    <span class="menu-sign">
      <div class="icon-bar"></div>
      <div class="icon-bar"></div>
      <div class="icon-bar"></div>
    </span>
  </div>
  <ul>
    <li><a href="index.html">الرئيسية</a></li>
    <li><a href="about.html">عنا</a></li>
    <li>
      <a href="courses.html">الدورات</a>
    </li>
    <li>
      <a href="articles.html">مقالات</a>
    </li>
    <li>
      <a target="_blank" href="code-editor.html">محرر الأكواد</a>
    </li>
    <li>
      <a target="_blank" href="blocks.html">محرر البلكات</a>
    </li>
    </ul>
`;
document.getElementById("-mainFooter").innerHTML = `
  <p dir="ltr">Made with Zyad Ibrahem &copy; <span id="year"></span></p>
`;

let date = new Date();
document.getElementById("year").innerHTML = date.getFullYear() || "2024";
document.querySelector("header .menu-sign").onclick = () => {
  document.querySelector("header ul").classList.toggle("active");
};
document.querySelectorAll("header .logo .go-to-home-page").forEach((link) => {
  link.onclick = () => {
    window.location.pathname = "/index.html";
  };
});

let goTopBTN = document.getElementById("-goTop");
window.addEventListener("scroll", () => {
  if (window.scrollY >= 500) {
    goTopBTN.style.opacity = "1";
    goTopBTN.style.cursor = "pointer";
    goTopBTN.style.pointerEvents = "auto";
  } else {
    goTopBTN.style.opacity = "0";
    goTopBTN.style.cursor = "context-menu";
    goTopBTN.style.pointerEvents = "none";
  }
});
goTopBTN.onclick = () => {
  window.scrollTo({
    behavior: "smooth",
    top: 0,
    left: 0,
  });
};

function checkOffline() {
  if (!navigator.onLine) {
    window.document.getElementsByTagName("html")[0].innerHTML = `
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>لا يوجد اتصال</title>
          <style>
            .offline {
              margin: 50px 200px;
              text-align: right;
              font-size: 21px;
              direction: rtl;
              h3 {
                color: var(--button-bg);
              }
              h4 {
                color: #c82333;
              }
              li {
                color: #4f46e5;
              }
            }
          </style>
        </head>
        <body>
          <div class="offline" id="offline">
            <h3>لا يوجد انترنت</h3>
            <h4>جرب:</h4>
            <ul>
              <li>تأكد من اتصلك بالمُوجِّه (router)</li>
              <li>تأكد من وجود انترنت</li>
            </ul>
            <button
              style="
                background-color: #dc3545;
                color: #ffffff;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9em;
                transition: background-color 0.3s;
              "
              onclick="window.location.reload()"
            >
              اعادة تحميل
            </button>
          </div>
          <script>
            function checkOnline() {
              if (navigator.onLine) {
                location.reload()
                window.location.href = "index.html";
              }
            }
            checkOnline();
            window.addEventListener("online", checkOnline);
          </script>
        </body>
    `;
  }
}

checkOffline();

window.addEventListener("offline", checkOffline);
