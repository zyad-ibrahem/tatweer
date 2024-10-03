const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const codeValue = urlParams.get("code")
  ? urlParams.get("code").toLowerCase()
  : "";

document.getElementsByTagName("html")[0].innerHTML = codeValue
let comment = document.createComment("هذا الكود تم انشاءه من قبل تطوير")
let script = document.createElement("script")
script.src = "js/test.js";
document.body.append(comment)
document.body.appendChild(script)
