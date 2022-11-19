const taskInput = document.getElementById("newTask"),
      addTaskButton = document.querySelector("#addButton"),
      addedTask = document.getElementsByTagName("label");

function checkUserInput(input) {
  if (/^\s*$/.test(input.value)) {
    input.setCustomValidity("Invalid, please input a task.");
    input.style = "border-color: red;";
    return false;
  }

  if (addedTask.length > 0) {
    for (const task of addedTask) {
      if (task.textContent == input.value) {
        input.setCustomValidity("Invalid, task is already added.");
        input.style = "border-color: red;";
        return false;
      }
    }
  }

  input.setCustomValidity("");
  input.style = "border:color: black;";
  return true;
}

addTaskButton.addEventListener("click", () => {
  if (checkUserInput(taskInput)) {
    const newListItem = document.createElement("li"),
          label = document.createElement("label"),
          editTaskInput = document.createElement("textarea"),
          editInputAttribute = document.createAttribute("class"),
          editTaskButton = document.createElement("button"),
          editButtonAttribute = document.createAttribute("class"),
          deleteTaskButton = document.createElement("button"),
          deleteButtonAttribute = document.createAttribute("class"),
          parentElement = document.getElementById("addedTask"),
          theFirstChild = parentElement.firstChild;

    label.appendChild(document.createTextNode(taskInput.value));

    editInputAttribute.nodeValue = "editTaskInput";
    editTaskInput.setAttributeNode(editInputAttribute);

    editTaskButton.appendChild(document.createTextNode("EDIT"));
    editButtonAttribute.nodeValue = "editButton";
    editTaskButton.setAttributeNode(editButtonAttribute);
    editTaskButton.addEventListener("click", editTask);

    deleteTaskButton.appendChild(document.createTextNode("DELETE"));
    deleteButtonAttribute.nodeValue = "deleteButton";
    deleteTaskButton.setAttributeNode(deleteButtonAttribute);
    deleteTaskButton.addEventListener("click", deleteTask);

    newListItem.appendChild(label);
    newListItem.appendChild(editTaskInput);
    newListItem.appendChild(editTaskButton);
    newListItem.appendChild(deleteTaskButton);

    parentElement.insertBefore(newListItem, theFirstChild);

    taskInput.value = "";

    taskLabel.style.display = "block";
  }
});

function editTask() {
  const label = this.parentNode.childNodes[0],
        editTaskInput = this.parentNode.childNodes[1],
        editButton = this.parentNode.childNodes[2],
        deleteButton = this.parentNode.childNodes[3];

  if (editButton.textContent == "EDIT") {
    editButton.textContent = "SAVE";
    deleteButton.disabled = true;
    editTaskInput.value = label.textContent;
  } else {
    if (editTaskInput.value != label.textContent && !checkUserInput(editTaskInput))
      return;

    editButton.textContent = "EDIT";
    deleteButton.disabled = false;
    label.textContent = editTaskInput.value;
  }

  this.parentNode.classList.toggle("editMode");
}

function deleteTask() {
  this.parentNode.remove();

  if (addedTask.length == 0) 
    taskLabel.style.display = "none";
}