// taskManager.js
import { createNewProject, loadProjects } from "./projectList.js";
import { createTaskForm } from "./taskList.js";

export function content() {
  const app = document.getElementById("content");

  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.id = "project";
  projectInput.placeholder = "Add a new Project...";

  const addButton = document.createElement("button");
  addButton.id = "add";
  addButton.textContent = "Add";

  const projectList = document.createElement("ul");
  projectList.id = "projectList";

  // Append the elements
  inputContainer.appendChild(projectInput);
  inputContainer.appendChild(addButton);
  app.appendChild(inputContainer);
  app.appendChild(projectList);

  // Load projects from localStorage on page load
  loadProjects(projectList, updateLocalStorage);

  addButton.addEventListener("click", () => {
    const projectText = projectInput.value.trim();
    if (projectText === "") {
      alert("Please enter a Project.");
      return;
    }
    createNewProject(projectText, projectList, updateLocalStorage);
    projectInput.value = "";
    projectInput.focus();
    updateLocalStorage();
  });

  projectInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const projectText = projectInput.value.trim();
      if (projectText === "") {
        alert("Please enter a Project.");
        return;
      }
      createNewProject(projectText, projectList, updateLocalStorage);
      projectInput.value = "";
      projectInput.focus();
      updateLocalStorage();
    }
  });

  function updateLocalStorage() {
    const projects = [];
    const projectItems = projectList.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      const projectName = item.querySelector("span").textContent;
      const taskItems = item
        .querySelector(".task-list")
        .querySelectorAll(".task-item");
      const tasks = Array.from(taskItems).map((taskItem) => {
        return {
          name: taskItem.querySelector("span").textContent.split(" - ")[0], // Extract task name
          description: taskItem
            .querySelector("span")
            .textContent.split(" - ")[1]
            .split(" (")[0], // Extract description
          dueDate: taskItem
            .querySelector("span")
            .textContent.split("Due: ")[1]
            .split(",")[0], // Extract due date
          priority: taskItem
            .querySelector("span")
            .textContent.split("Priority: ")[1]
            ? taskItem
                .querySelector("span")
                .textContent.split("Priority: ")[1]
                .split(")")[0]
            : "", // Extract priority
          completed: taskItem.querySelector("input[type='checkbox']").checked,
        };
      });
      projects.push({
        text: projectName,
        completed: checkbox.checked,
        tasks: tasks,
      });
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}
