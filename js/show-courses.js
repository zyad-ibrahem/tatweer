const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let courseId = urlParams.get("courseId") ? +urlParams.get("courseId") : 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch(`../json/all_courses/course_${courseId}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((coursesData) => {
      let courseTitle = urlParams.get("courseName")
        ? urlParams.get("courseName")
        : "";
      let courseDiscription = urlParams.get("courseDescription")
        ? urlParams.get("courseDescription")
        : "";

      document.getElementById("title").textContent = courseTitle;
      document.getElementById("discription").textContent = courseDiscription;

      let lessons = document.getElementById("lessons");
      for (let i = 0; i < coursesData.length; i++) {
        lessons.innerHTML += `
          <div class="lesson-item">
            <h3>درس <span>${coursesData[i].id}</span>: 
            <div>${coursesData[i].title}</div></h3>
            <p>
              ${coursesData[i].description}
            </p>
            <a class="lesson btn"
              >شاهد الدرس <i class="fas fa-arrow-right"></i
            ></a>
          </div>
        `;

        const data = { lessonId: coursesData[i].id, courseId: courseId };
        const queryString = new URLSearchParams(data).toString();
        document.getElementsByClassName("lesson")[
          i
        ].href = `lesson.html?${queryString}`;
      }
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
});

let preBtn = document.getElementById("pre");
let nextBtn = document.getElementById("next");
let nSpan = document.getElementById("num");
