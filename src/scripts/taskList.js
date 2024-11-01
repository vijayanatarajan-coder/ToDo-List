// taskList.js
import { createTaskElement } from "./task.js";

export function createTaskForm(taskList, updateLocalStorage) {
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

export function loadTasks(taskList, tasks, updateLocalStorage) {
  tasks.forEach((task) => {
    createTaskElement(taskList, task, updateLocalStorage);
  });
}
