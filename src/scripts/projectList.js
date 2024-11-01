// projectList.js
import { createProjectElement } from "./project.js";
import { loadTasks } from "./taskList.js";

export function loadProjects(projectList, updateLocalStorage) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.forEach((project) => {
    createProjectElement(
      project.text,
      project.completed,
      project.tasks,
      projectList,
      updateLocalStorage
    );
  });
}

export function createNewProject(projectText, projectList, updateLocalStorage) {
  createProjectElement(projectText, false, [], projectList, updateLocalStorage);
}
