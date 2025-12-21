function settask() {
    let inputBox = document.getElementById("input-box");
    let tasklist = document.getElementById("task-list");
    let taskcontainer = document.querySelector(".task-container");
      taskcontainer.style.display = "block";
    if (inputBox.value== "") {
        alert("plzzz added task first!!");
    } else {
        let li = document.createElement("li");
        li.style = "text-align:center; margin:1px; background-color:rgb(87,144,255); border-radius:8px;color:black;box-shadow:2px 2px 5px black;font-weight:bold;font-size:23px;";
        li.innerHTML ="<input type='checkbox' id='task-checkbox' onclick='complete(this)'>" +inputBox.value+"<button class='delete-btn' onclick='this.parentElement.remove()'><i class=\"fa-solid fa-trash-can\"></i></button>";
        tasklist.appendChild(li);
        inputBox.value = "";
    }
}

function complete(cb) {
  if (cb.checked) {
    cb.parentElement.style.textDecoration = "line-through";
    cb.parentElement.style.backgroundColor = "rgba(103, 175, 94, 1)";
    cb.parentElement.style.color = "black";
  } else {
    cb.parentElement.style.textDecoration = "none";
    cb.parentElement.style.backgroundColor = "rgb(87,144,255)";
    cb.parentElement.style.color = "black";
  }
}


