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
      <a href="code-editor.html">محرر الأكواد</a>
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
