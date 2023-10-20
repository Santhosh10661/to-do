let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let imgdark = document.querySelector(".imgContainer-dark");
let imglight = document.querySelector(".imgContainer-light");
let listBox = document.querySelector(".listBox ");
let list = document.querySelector(".list");
let taskInput = document.querySelector(".task");
// inputField Circle
let inputCircle = document.querySelector(".inputCircle");
inputCircle.addEventListener("click", updateInputCircle);
function updateInputCircle() {
  if (inputCircle.classList.length === 2) {
    inputCircle.classList.remove("inputCircleMarked");
    taskInput.classList.remove("taskCompleted");
  } else {
    inputCircle.classList.add("inputCircleMarked");
    taskInput.classList.add("taskCompleted");
  }
}
// task completion
document.addEventListener("DOMContentLoaded", reload);
function reload() {
  updateLists();
}
function updateLists() {
  let circle = document.querySelectorAll(".circle");
  circle.forEach((cir) => {
    cir.addEventListener("click", markTaskCompleted);
  });
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((del) => {
    del.addEventListener("click", deleteTask);
  });
}
function markTaskCompleted() {
  let clickedCircle = this;
  let clickedTask = clickedCircle.parentElement;
  if (clickedCircle.classList.length === 2) {
    clickedCircle.classList.remove("task-completed-circle");
    clickedTask.classList.remove("taskCompleted");
    clickedTask.classList.add("incomplete");
    updateCount();
  } else {
    clickedCircle.classList.add("task-completed-circle");
    clickedTask.classList.add("taskCompleted");
    clickedTask.classList.remove("incomplete");
    updateCount();
  }
}
// theme changes
sun.addEventListener("click", () => {
  sun.style.display = "none";
  moon.style.display = "block";
  document.body.style.background = "hsl(0, 0%, 98%)";
  imgdark.style.display = "none";
  imglight.style.display = "block";
  listBox.classList.add("light");
});
moon.addEventListener("click", () => {
  moon.style.display = "none";
  sun.style.display = "block";
  document.body.style.background = "hsl(235, 21%, 11%)";
  imglight.style.display = "none";
  imgdark.style.display = "block";
  listBox.classList.remove("light");
});
// task count
function updateCount() {
  let incompletedTask = document.querySelectorAll(".incomplete");
  let currentCount = document.querySelector(".count");
  currentCount.innerHTML = incompletedTask.length;
}
// task adding
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (taskInput.value !== "") {
      let inputValue = taskInput.value;
      let addedTask = document.createElement("div");
      addedTask.innerHTML = `
          <div class="circle"></div>
          <p class="m-0">${inputValue}</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="deleteBtn mx-4" >
            <path
              fill="#494C6B"
              fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>`;
      if (inputCircle.className.includes("inputCircleMarked")) {
        addedTask.classList.add(
          "col",
          "addedlist",
          "px-2",
          "py-3",
          "taskCompleted"
        );
        addedTask.firstElementChild.classList.add("task-completed-circle");
        updateInputCircle();
      } else {
        addedTask.classList.add(
          "col",
          "addedlist",
          "px-2",
          "py-3",
          "incomplete"
        );
      }
      list.append(addedTask);
      taskInput.value = "";
      reload();
      updateCount();
    } else {
      taskInput.placeholder = "can't be blank";
      taskInput.classList.add("emptyInput");
      setTimeout(() => {
        taskInput.placeholder = "write something";
        taskInput.classList.remove("emptyInput");
      }, 500);
    }
  }
});
//filters to sort
// active filter
let active = document.querySelectorAll(".active");
active.forEach((clickedActive) => {
  clickedActive.addEventListener("click", activeFilter);
});
function activeFilter() {
  let alreadyActive = document.querySelectorAll(".activeFilter");
  alreadyActive.forEach((alAct) => {
    alAct.classList.remove("activeFilter");
  });
  active.forEach((allActiveField) => {
    allActiveField.classList.add("activeFilter");
  });
  let allCompletedTask = document.querySelectorAll(".taskCompleted");
  allCompletedTask.forEach((completedTask) => {
    completedTask.style.display = "none";
  });
  let allIncompleteTask = document.querySelectorAll(".incomplete");
  allIncompleteTask.forEach((incompletedTask) => {
    incompletedTask.style.display = "flex";
  });
}
// all filter
let all = document.querySelectorAll(".all");
all.forEach((clickedAll) => {
  clickedAll.addEventListener("click", allFilter);
});
function allFilter() {
  let alreadyActive = document.querySelectorAll(".activeFilter");
  alreadyActive.forEach((alAct) => {
    alAct.classList.remove("activeFilter");
  });
  all.forEach((allActiveField) => {
    allActiveField.classList.add("activeFilter");
  });
  let allAddedTask = document.querySelectorAll(".addedlist");
  allAddedTask.forEach((addedTask) => {
    addedTask.style.display = "flex";
  });
}
// completed filter
let completed = document.querySelectorAll(".completed");
completed.forEach((clickedCompleted) => {
  clickedCompleted.addEventListener("click", completedFilter);
});
function completedFilter() {
  let alreadyActive = document.querySelectorAll(".activeFilter");
  alreadyActive.forEach((alAct) => {
    alAct.classList.remove("activeFilter");
  });
  completed.forEach((allActiveField) => {
    allActiveField.classList.add("activeFilter");
  });
  let allIncompleteTask = document.querySelectorAll(".incomplete");
  allIncompleteTask.forEach((incompletedTask) => {
    incompletedTask.style.display = "none";
  });

  let allCompletedTask = document.querySelectorAll(".taskCompleted");
  allCompletedTask.forEach((completedTask) => {
    completedTask.style.display = "flex";
  });
}
// clear completed
let clearCompleted = document.querySelector(".clear");
clearCompleted.addEventListener("click", () => {
  let allCompletedTask = document.querySelectorAll(".taskCompleted");
  allCompletedTask.forEach((completedTask) => {
    completedTask.remove();
  });
});
// delete task
function deleteTask() {
  let task = this.parentElement;
  task.remove();
  updateCount();
}
