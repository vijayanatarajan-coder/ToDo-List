// task.js
export function createTaskElement(taskList, task, updateLocalStorage) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskName = document.createElement("span");
  taskName.textContent = `${task.name} - ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority})`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const editTaskButton = document.createElement("button");
  editTaskButton.textContent = "Edit";

  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.textContent = "Delete Task";

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    updateLocalStorage();
  });

  deleteTaskButton.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    updateLocalStorage();
  });

  editTaskButton.addEventListener("click", () => {
    showEditModal(task, taskName, taskItem, updateLocalStorage);
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskName);
  taskItem.appendChild(editTaskButton);
  taskItem.appendChild(deleteTaskButton);
  taskList.appendChild(taskItem);
}

function showEditModal(task, taskNameElement, taskItem, updateLocalStorage) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modal.className = "modal-content";

  const modalHeader = document.createElement("h2");
  modalHeader.textContent = "Edit Task";

  const taskNameInput = document.createElement("input");
  taskNameInput.type = "text";
  taskNameInput.placeholder = "Task Name";
  taskNameInput.value = task.name;

  const taskDescriptionInput = document.createElement("input");
  taskDescriptionInput.type = "text";
  taskDescriptionInput.placeholder = "Task Description";
  taskDescriptionInput.value = task.description;

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = task.dueDate;

  const priorityInput = document.createElement("select");
  const lowOption = new Option("Low", "low");
  const mediumOption = new Option("Medium", "medium");
  const highOption = new Option("High", "high");
  priorityInput.add(lowOption);
  priorityInput.add(mediumOption);
  priorityInput.add(highOption);
  priorityInput.value = task.priority;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    task.name = taskNameInput.value.trim();
    task.description = taskDescriptionInput.value.trim();
    task.dueDate = dueDateInput.value;
    task.priority = priorityInput.value;

    taskNameElement.textContent = `${task.name} - ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority})`;
    modal.remove(); // Close modal
    updateLocalStorage();
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Cancel";
  closeButton.addEventListener("click", () => modal.remove()); // Close modal

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(taskNameInput);
  modalContent.appendChild(taskDescriptionInput);
  modalContent.appendChild(dueDateInput);
  modalContent.appendChild(priorityInput);
  modalContent.appendChild(saveButton);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}
