const userTask = document.querySelector("#addItem");
const SubmitBtn = document.querySelector("#AddLogo");

const viewAll = document.querySelector(".Listitem");
const viewComplete = document.querySelector(".CompleteItem");
const viewPending = document.querySelector(".PandingItem");
const viewImportant = document.querySelector(".ImportantItem");
const viewHistory = document.querySelector(".HistoryItem");

const listAll = document.querySelector("#AllTaskHere");
const listComplete = document.querySelector("#AllCompleteTaskHere");
const listPending = document.querySelector("#AllPandingTaskHere");
const listImportant = document.querySelector("#AllImportantTaskHere");
const listHistory = document.querySelector("#AllHistoryTaskHere");

const sideButtons = document.querySelectorAll(".SidePannel button");

let tasksData = [];
let historyData = [];
let currentTab = "all";

window.addEventListener("DOMContentLoaded", () => {
    loadData();
    AllTaskShow();
});

userTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") SubmitBtn.click();
});

SubmitBtn.addEventListener("click", submitTask);

function submitTask() {
    const text = userTask.value.trim();
    if (text === "") {
        alert("Please Enter Firstly Your Task");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        isCompleted: false,
        isImportant: false
    };

    tasksData.unshift(newTask);
    saveData();
    renderAllViews();

    userTask.value = "";
    userTask.focus();
    AllTaskShow();
}

function AllTaskShow() {
    currentTab = "all";
    switchPanel(viewAll, 0);
}

function AllCompleteTask() {
    currentTab = "complete";
    switchPanel(viewComplete, 1);
}

function AllPandingTask() {
    currentTab = "pending";
    switchPanel(viewPending, 2);
}

function AllImportantTask() {
    currentTab = "important";
    switchPanel(viewImportant, 3);
}

function AllHistoryTask() {
    currentTab = "history";
    switchPanel(viewHistory, 4);
}

function switchPanel(activeView, buttonIndex) {
    const panels = [viewAll, viewComplete, viewPending, viewImportant, viewHistory];
    panels.forEach(panel => panel.classList.remove("active-view"));
    activeView.classList.add("active-view");

    sideButtons.forEach(btn => btn.classList.remove("active-btn"));

    const totalActive = tasksData.length + historyData.length;
    if (totalActive > 0) {
        sideButtons[buttonIndex].classList.add("active-btn");
    }
}

function toggleStar(id) {
    const task = tasksData.find(t => t.id === id);
    if (task) {
        task.isImportant = !task.isImportant;
        saveData();
        renderAllViews();
    }
}

function toggleComplete(id) {
    const task = tasksData.find(t => t.id === id);
    if (task) {
        task.isCompleted = !task.isCompleted;
        saveData();
        renderAllViews();
    }
}

function deleteTask(id) {
    const taskIndex = tasksData.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        const deletedItem = tasksData.splice(taskIndex, 1)[0];
        historyData.unshift(deletedItem);
        saveData();
        renderAllViews();
    }
}

function permanentDelete(id) {
    historyData = historyData.filter(t => t.id !== id);
    saveData();
    renderAllViews();
}

function restoreTask(id) {
    const taskIndex = historyData.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        const restoredItem = historyData.splice(taskIndex, 1)[0];
        tasksData.unshift(restoredItem);
        saveData();
        renderAllViews();
    }
}

function renderAllViews() {
    listAll.innerHTML = "";
    listComplete.innerHTML = "";
    listPending.innerHTML = "";
    listImportant.innerHTML = "";
    listHistory.innerHTML = "";

    tasksData.forEach(task => {
        const html = `
            <li class="Task-row">
                <span class="star-icon" onclick="toggleStar(${task.id})" style="color: ${task.isImportant ? '#fbc02d' : '#fff'};">
                    ${task.isImportant ? '★' : '☆'}
                </span>
                <div class="task-left ${task.isCompleted ? 'completed' : ''} ${task.isImportant ? 'important' : ''}">
                    <input type="checkbox" class="task-checkbox" onchange="toggleComplete(${task.id})" ${task.isCompleted ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                    <button class="DelBtn" onclick="deleteTask(${task.id})">X</button>
                </div>
            </li>
        `;

        listAll.insertAdjacentHTML('beforeend', html);

        if (task.isCompleted) {
            listComplete.insertAdjacentHTML('beforeend', html);
        } else {
            listPending.insertAdjacentHTML('beforeend', html);
        }

        if (task.isImportant) {
            listImportant.insertAdjacentHTML('beforeend', html);
        }
    });

    historyData.forEach(task => {
        const historyHtml = `
            <li class="Task-row">
                <div class="task-left">
                    <span class="task-text">${task.text}</span>
                    <button class="DelBtn" style="color: green; margin-right: 8px;" onclick="restoreTask(${task.id})">↺</button>
                    <button class="DelBtn" onclick="permanentDelete(${task.id})">X</button>
                </div>
            </li>
        `;
        listHistory.insertAdjacentHTML('beforeend', historyHtml);
    });

    const totalActive = tasksData.length + historyData.length;
    if (totalActive === 0) {
        sideButtons.forEach(btn => btn.classList.remove("active-btn"));
    }
}

function saveData() {
    localStorage.setItem("myTodoListData", JSON.stringify(tasksData));
    localStorage.setItem("myTodoListHistory", JSON.stringify(historyData));
}

function loadData() {
    const savedTasks = localStorage.getItem("myTodoListData");
    const savedHistory = localStorage.getItem("myTodoListHistory");

    tasksData = savedTasks ? JSON.parse(savedTasks) : [];
    historyData = savedHistory ? JSON.parse(savedHistory) : [];

    renderAllViews();
}

const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
});
