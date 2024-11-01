// project.js
import { createTaskElement } from "./task.js";

export function createProjectElement(
  projectText,
  completed = false,
  tasks = [],
  projectList,
  updateLocalStorage
) {
  const li = document.createElement("li");
  li.className = "project-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const projectName = document.createElement("span");
  projectName.textContent = projectText;

  const taskButton = document.createElement("button");
  taskButton.textContent = "Manage Tasks";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  const taskList = document.createElement("ul");
  taskList.className = "task-list";

  tasks.forEach((task) =>
    createTaskElement(taskList, task, updateLocalStorage)
  );

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateLocalStorage();
  });

  editButton.addEventListener("click", () => {
    const newProjectText = prompt(
      "Edit your project:",
      projectName.textContent
    );
    if (newProjectText !== null) {
      projectName.textContent = newProjectText.trim();
      updateLocalStorage();
    }
  });

  deleteButton.addEventListener("click", () => {
    projectList.removeChild(li);
    updateLocalStorage();
  });

  const taskForm = createTaskForm(taskList, updateLocalStorage);

  taskButton.addEventListener("click", () => {
    taskForm.style.display =
      taskForm.style.display === "none" ? "block" : "none";
  });

  li.appendChild(checkbox);
  li.appendChild(projectName);
  li.appendChild(taskButton);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  li.appendChild(taskForm);
  li.appendChild(taskList);

  projectList.appendChild(li);
}

function createTaskForm(taskList, updateLocalStorage) {
  const form = document.createElement("div");
  form.className = "task-form";
  form.style.display = "none"; // Initially hidden

  const taskNameInput = document.createElement("input");
  taskNameInput.type = "text";
  taskNameInput.placeholder = "Task Name";

  const taskDescriptionInput = document.createElement("input");
  taskDescriptionInput.type = "text";
  taskDescriptionInput.placeholder = "Task Description";

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";

  const priorityInput = document.createElement("select");
  const lowOption = new Option("Low", "low");
  const mediumOption = new Option("Medium", "medium");
  const highOption = new Option("High", "high");
  priorityInput.add(lowOption);
  priorityInput.add(mediumOption);
  priorityInput.add(highOption);

  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Add Task";

  addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();

    const task = {
      name: taskNameInput.value.trim(),
      description: taskDescriptionInput.value.trim(),
      dueDate: dueDateInput.value,
      priority: priorityInput.value,
      completed: false,
    };

    if (task.name) {
      createTaskElement(taskList, task, updateLocalStorage);
      taskNameInput.value = "";
      taskDescriptionInput.value = "";
      dueDateInput.value = "";
      priorityInput.value = "low"; // Reset to default
      updateLocalStorage();
    } else {
      alert("Please enter a task name.");
    }
  });

  form.appendChild(taskNameInput);
  form.appendChild(taskDescriptionInput);
  form.appendChild(dueDateInput);
  form.appendChild(priorityInput);
  form.appendChild(addTaskButton);

  return form;
}
