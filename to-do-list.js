function settask() {
    let inputBox = document.getElementById("input-box");
    let tasklist = document.getElementById("task-list");
    let taskcontainer = document.querySelector(".task-container");
    let dateInput = document.getElementById("date-input");
    if (inputBox.value== "" || dateInput.value=="") {
        alert("plzzz added date and task !!");
    } else {
        let li = document.createElement("li");
        li.style = "text-align:center; padding:2px; margin:5px; background-color:yellow; border-radius:5px;color:black;box-shadow:2px 2px 5px pink;font-size:26px;";
        li.innerHTML ="<input type='checkbox' id='task-checkbox' onclick='complete()'>" +inputBox.value+"<button class='delete-btn' onclick='this.parentElement.remove()'><i class=\"fa-solid fa-trash-can\"></i></button>";
        tasklist.appendChild(li);
        inputBox.value = "";
    }
}
function complete() {
    let checkbox = document.getElementById("task-checkbox");
    if (checkbox.checked == true) {
        checkbox.parentElement.style.textDecoration = "line-through";
        checkbox.parentElement.style.backgroundColor = "lightgreen";
    }
 else {
        checkbox.parentElement.style.textDecoration = "none";
        checkbox.parentElement.style.backgroundColor = "rgba(57, 155, 177, 0.6)";
    }
}


