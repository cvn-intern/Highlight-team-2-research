// Elements
const taskInput = document.getElementById("task_input");
const submitBtn = document.getElementById("submit_btn");
let tasksList = document.getElementById("tasks_list");
// Functions
function stripTags(originalString) {
  return originalString.replace(/(<([^>]+)>)/gi, "");
}
function htmlentities(originalString) {
  return originalString.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });
}
function getTasksFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
function deleteTask(index) {
  let tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateTask(index) {}
function renderTasks() {
  const tasks = getTasksFromLocalStorage();
  console.log(tasks);
  let content = '<ul class="tasks_list">';
  tasks.forEach((task, id) => {
    let name = task.name;
    // name = stripTags(name);
    // name = htmlentities(name);
    // name = encodeURI(name);
    content += '<li class="task_container"' + "id=" + id + ">";
    content += '<p class="task_content">' + name + "</p>";
    content += '<div class="task_functions">';
    content +=
      '<button class="task_update_btn"' +
      "onclick='updateTask(" +
      id +
      ")'" +
      ">Update</button>";
    content +=
      '<button class="task_delete_btn"' +
      "onclick='deleteTask(" +
      id +
      ")'" +
      ">Delete</button>";
    content += "</div>";
    content += "</li>";
  });
  content += "</ul>";
  tasksList.innerHTML = content;
}
// Main
renderTasks();
submitBtn.addEventListener("click", function () {
  // Get tasks from local storage
  let tasks = getTasksFromLocalStorage();
  // Update tasks
  const newTask = { name: taskInput.value };
  tasks.push(newTask);
  // Set tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  // Reset states
});

// Cách fix:
// var userInput = '<script>alert("XSS");</script>';
// var element = document.createElement('div');
// var textNode = document.createTextNode(userInput);
// element.appendChild(textNode);

// <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
// --> Bất kỳ script nào không thuộc tên miền hiện tại đều không được approve