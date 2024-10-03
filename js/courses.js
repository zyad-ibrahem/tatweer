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

      coursesData.forEach((course) => {
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
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
});
