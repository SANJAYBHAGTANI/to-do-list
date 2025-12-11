function settask() {
    let inputBox = document.getElementById("input-box");
    let tasklist = document.getElementById("task-list");
    let taskcontainer = document.querySelector(".task-container");
    let dateInput = document.getElementById("date-input");
    if (inputBox.value== "" || dateInput.value=="") {
        alert("plzzz added date and task !!");
    } else {
        let li = document.createElement("li");
        li.style = "text-align:center; padding:2px; margin:5px; background-color:skyblue; border-radius:5px;color:black;box-shadow:2px 2px 5px skyblue;font-size:26px;";
        li.innerHTML ="<input type='checkbox' id='task-checkbox' onclick='complete(this)'>" +inputBox.value+"<button class='delete-btn' onclick='this.parentElement.remove()'><i class=\"fa-solid fa-trash-can\"></i></button>";
        tasklist.appendChild(li);
        inputBox.value = "";
    }
}

function complete(cb) {
  if (cb.checked) {
    cb.parentElement.style.textDecoration = "line-through";
    cb.parentElement.style.backgroundColor = "lightgreen";
    cb.parentElement.style.color = "black";
  } else {
    cb.parentElement.style.textDecoration = "none";
    cb.parentElement.style.backgroundColor = "skyblue";
  }
}


