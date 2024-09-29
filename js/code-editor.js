function setupEditor(editor, mode, storageKey) {
  const cmEditor = CodeMirror.fromTextArea(editor, {
    mode: mode,
    lineNumbers: true,
    theme: "dracula",
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-Z": "undo",
      "Ctrl-Y": "redo",
    },
    hintOptions: {
      completeSingle: false,
    },
  });

  // حفظ الكود في localStorage وإعادة تحميله
  const savedCode = localStorage.getItem(storageKey);
  if (savedCode) {
    cmEditor.setValue(savedCode);
  }

  cmEditor.on("change", () => {
    localStorage.setItem(storageKey, cmEditor.getValue());
    runCode();
  });

  cmEditor.on("inputRead", function (cm, change) {
    if (change.text[0] !== "") {
      cm.showHint();
    }
  });

  return cmEditor;
}

var htmlEditor = setupEditor(
  document.getElementById("html-editor"),
  "htmlmixed",
  "htmlCode"
);
var cssEditor = setupEditor(
  document.getElementById("css-editor"),
  "css",
  "cssCode"
);
var jsEditor = setupEditor(
  document.getElementById("js-editor"),
  "javascript",
  "jsCode"
);


function runCode() {
  if (!htmlEditor || !cssEditor || !jsEditor) return;
  var htmlCode = htmlEditor.getValue();
  var cssCode = cssEditor.getValue();
  var jsCode = jsEditor.getValue();

  var output =
    document.getElementById("output").contentDocument ||
    document.getElementById("output").contentWindow.document;

  output.open();
  output.write(`
        <style>${cssCode}</style>
        ${htmlCode}
        <script>${jsCode}<\/script>
    `);
  output.close();
}

function saveCode() {
  localStorage.setItem("htmlCode", htmlEditor.getValue());
  localStorage.setItem("cssCode", cssEditor.getValue());
  localStorage.setItem("jsCode", jsEditor.getValue());
  alert("تم حفظ الكود!");
}

function loadCode() {
  htmlEditor.setValue(localStorage.getItem("htmlCode") || "");
  cssEditor.setValue(localStorage.getItem("cssCode") || "");
  jsEditor.setValue(localStorage.getItem("jsCode") || "");
}

function changeTheme() {
  const theme = document.getElementById("theme").value;
  htmlEditor.setOption("theme", theme);
  cssEditor.setOption("theme", theme);
  jsEditor.setOption("theme", theme);
}

function deleteTemplate() {
  const templateName = document.getElementById("template").value;
  if (!templateName) {
    alert("يرجى اختيار قالب لحذفه");
    return;
  }

  const templates = JSON.parse(localStorage.getItem("templates") || "{}");
  delete templates[templateName];
  localStorage.setItem("templates", JSON.stringify(templates));

  updateTemplateList();
  alert("تم حذف القالب!");
}

function loadTemplate() {
  const template = document.getElementById("template").value;
  if (template) {
    const savedTemplate = JSON.parse(localStorage.getItem("templates") || "{}");
    const code = savedTemplate[template];
    if (code) {
      htmlEditor.setValue(code.html || "");
      cssEditor.setValue(code.css || "");
      jsEditor.setValue(code.js || "");
    }
  }
}

function saveTemplate() {
  const name = document.getElementById("templateName").value;
  if (!name) {
    alert("يرجى إدخال اسم القالب");
    return;
  }

  const templates = JSON.parse(localStorage.getItem("templates") || "{}");
  templates[name] = {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue(),
  };
  localStorage.setItem("templates", JSON.stringify(templates));

  updateTemplateList();
  alert("تم حفظ القالب!");
}

function updateTemplateList() {
  const templateSelect = document.getElementById("template");
  templateSelect.innerHTML = '<option value="">اختر قالب</option>';

  const templates = JSON.parse(localStorage.getItem("templates") || "{}");
  for (const name in templates) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    templateSelect.appendChild(option);
  }
}

updateTemplateList();

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;
    const extension = file.name.split(".").pop();

    switch (extension) {
      case "html":
        htmlEditor.setValue(content);
        break;
      case "css":
        cssEditor.setValue(content);
        break;
      case "js":
        jsEditor.setValue(content);
        break;
      default:
        alert("نوع الملف غير مدعوم");
        break;
    }
  };
  reader.readAsText(file);
}

function loadFromUrl() {
  const url = document.getElementById("fileUrl").value;
  if (!url) {
    alert("يرجى إدخال رابط الملف");
    return;
  }

  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      const extension = url.split(".").pop();

      switch (extension) {
        case "html":
          htmlEditor.setValue(content);
          break;
        case "css":
          cssEditor.setValue(content);
          break;
        case "js":
          jsEditor.setValue(content);
          break;
        default:
          alert("نوع الملف غير مدعوم");
          break;
      }
    })
    .catch((error) => alert("حدث خطأ أثناء تحميل الملف: " + error.message));
}

function downloadCode(type) {
  let code, filename;

  switch (type) {
    case "html":
      code = htmlEditor.getValue();
      filename = "index.html";
      break;
    case "css":
      code = cssEditor.getValue();
      filename = "styles.css";
      break;
    case "js":
      code = jsEditor.getValue();
      filename = "script.js";
      break;
    default:
      alert("نوع الكود غير معروف");
      return;
  }

  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadAll() {
  const htmlCode = htmlEditor.getValue();
  const cssCode = cssEditor.getValue();
  const jsCode = jsEditor.getValue();

  // إنشاء ملفات Blob
  const htmlBlob = new Blob([htmlCode], { type: "text/html" });
  const cssBlob = new Blob([cssCode], { type: "text/css" });
  const jsBlob = new Blob([jsCode], { type: "application/javascript" });

  // إنشاء روابط تحميل للملفات
  const htmlUrl = URL.createObjectURL(htmlBlob);
  const cssUrl = URL.createObjectURL(cssBlob);
  const jsUrl = URL.createObjectURL(jsBlob);

  // إنشاء ملف مضغوط (ZIP)
  const zip = new JSZip();
  zip.file("index.html", htmlBlob);
  zip.file("styles.css", cssBlob);
  zip.file("script.js", jsBlob);

  // تنزيل الملف المضغوط
  zip.generateAsync({ type: "blob" }).then(function (content) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "code-files.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
