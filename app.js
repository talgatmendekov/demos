// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.getElementsByTagName("button")[0]; // First button
var incompleteTaskHolder = document.getElementById("incompletetasks"); // ul of #incompletetasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");

  // Input (checkbox)
  var checkBox = document.createElement("input"); // Checkbx
  // Label
  var label = document.createElement("label"); // Label
  // Input (text)
  var editInput = document.createElement("input"); // Text
  // Button.edit
  var editButton = document.createElement("button"); // Edit button

  // Button.delete
  var deleteButton = document.createElement("button"); // Delete button
  var deleteButtonImg = document.createElement("img"); // Delete button image

  label.innerText = taskString;
  label.className = "task";

  // Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "edit"; // InnerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  // And appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {
  console.log("add task...");
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompletetaskholder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit an existing task.
var editTask = function() {
  console.log("edit task...");
  console.log("change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editmode");
  // If class of the parent is .editmode
  if (containsClass) {
    // Switch to .editmode
    // Label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "save";
  }

  // Toggle .editmode on the parent.
  listItem.classList.toggle("editmode");
};

// Delete task.
var deleteTask = function() {
  console.log("delete task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted = function() {
  console.log("complete task...");

  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("incomplete task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incompletetasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("ajax request");
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // Select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// Cycle over incompletetaskholder ul list items
// For each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  // Bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // Bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
// Prevent creation of empty tasks.
// Change edit to save when you are in edit mode.
