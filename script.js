window.onload = function(){
let savedTasks = localStorage.getItem("tasks");
if(savedTasks){
document.getElementById("task-list").innerHTML = savedTasks;
}
toggleClearButton();
}
document.getElementById("input-box").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
    settask();
    }
});

function settask() {
let inputBox = document.getElementById("input-box");
let tasklist = document.getElementById("task-list");

if (inputBox.value === "") {
alert("Please add a task first!");
return;
}

let li = document.createElement("li");

li.className = "task-item";

li.innerHTML = `
<input type="checkbox" onclick="complete(this)">
<span class="task-text">${inputBox.value}</span>
<button class="delete-btn" onclick="deleteTask(this)">
<i class="fa-solid fa-trash"></i>
</button>
`;

tasklist.prepend(li);
inputBox.value = "";
toggleClearButton();
localStorage.setItem("tasks", tasklist.innerHTML);
}
function deleteTask(btn){
btn.parentElement.remove();
localStorage.setItem("tasks", document.getElementById("task-list").innerHTML);
toggleClearButton();
}

function complete(cb) {
  if (cb.checked) {
    cb.parentElement.style.textDecoration = "line-through";
    cb.parentElement.style.backgroundColor = "#7ed957";
    cb.parentElement.style.color = "black";
  } else {
    cb.parentElement.style.textDecoration = "none";
    cb.parentElement.style.backgroundColor = "#6ea8ff";
    cb.parentElement.style.color = "black";
  }
  localStorage.setItem("tasks", document.getElementById("task-list").innerHTML);
}

function toggleClearButton(){
let tasklist = document.getElementById("task-list");
let clearBtn = document.getElementById("clear-btn");

if(tasklist.children.length > 0){
clearBtn.style.display = "block";
}else{
clearBtn.style.display = "none";
}
} 

function clearAll(){
document.getElementById("task-list").innerHTML="";
localStorage.removeItem("tasks");
toggleClearButton();
}

window.onload = function(){

// load tasks
let savedTasks = localStorage.getItem("tasks");
if(savedTasks){
document.getElementById("task-list").innerHTML = savedTasks;
}

toggleClearButton();

// load mode
let savedMode = localStorage.getItem("mode");

let toggle = document.getElementById("mode-toggle");
let modeText = document.getElementById("mode-text");

if(savedMode === "dark"){
document.body.classList.add("dark-mode");
toggle.checked = true;
modeText.innerText = "🌙 Dark";
}else{
modeText.innerText = "☀️ Light";
}

// toggle event
toggle.addEventListener("change", function(){

document.body.classList.toggle("dark-mode");

if(toggle.checked){
modeText.innerText = "🌙 Dark";
localStorage.setItem("mode","dark");
}else{
modeText.innerText = "☀️ Light";
localStorage.setItem("mode","light");
}

});

};