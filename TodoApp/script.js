const EnteredTask = document.querySelector("#Task");
const DivTask = document.querySelector(".task");
let AddBtn = document.querySelector(".Addtask button");
let ResetBtn = document.querySelector("#reset");
let Time = document.querySelector(".Time");
let Container = document.querySelector(".Container");
let body = document.querySelector("body");
let Icon = document.querySelector("i");
function Addtasks() {
  const addedTask = EnteredTask.value.trim();
  if (addedTask === "" && Time.value === "") {
    alert("Write Task and Time and then click Add button or Enter");
    return;
  } else if (Time.value === "" || addedTask === "") {
    let missingField = Time.value == "" ? "Time" : "Task";
    alert(`Still ${missingField} is missing bro`);
    return;
  }
  // Save each task with a unique key (timestamp)
  const uniqueKey = `Task-${Date.now()}`;
  localStorage.setItem(uniqueKey, addedTask);

  DisplayTask(uniqueKey, addedTask);

  EnteredTask.value = ""; // clear input
  Time.value = "";
}
AddBtn.addEventListener("click", Addtasks);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    Addtasks();
  }
});
function DisplayTask(key, value) {
  // Input field (readonly)
  let input = document.createElement("input");
  input.setAttribute("readonly", "");

  input.value = Time.value.slice(0, 10) + " " + Time.value.slice(11) + " ";
  input.value += value;
  input.innerText = "task";
  DivTask.appendChild(input);

  // Remove Button
  let RemoveBtn = document.createElement("button");
  RemoveBtn.innerText = "Remove";
  DivTask.appendChild(RemoveBtn);
  // Edit Button
  let EditBtn = document.createElement("button");
  EditBtn.innerText = "Edit";
  DivTask.appendChild(EditBtn);

  let StoredTime = Time.value;

  // Line Break
  let br = document.createElement("br");
  DivTask.appendChild(br);

  // Remove Event
  RemoveBtn.addEventListener("click", () => {
    localStorage.removeItem(key);
    input.remove();
    RemoveBtn.remove();
    br.remove();
    EditBtn.remove();
  });
  EditBtn.addEventListener("click", () => {
    input.value = value;
    EnteredTask.value = input.value;
    Time.value = StoredTime;
    localStorage.removeItem(key);
    input.remove();
    RemoveBtn.remove();
    br.remove();
    EditBtn.remove();
  });
  Reset(input, RemoveBtn, br, EditBtn, Time.value);
}
function Reset(input, RemoveBtn, br, EditBtn, Time) {
  ResetBtn.addEventListener("click", () => {
    localStorage.clear();
    input.remove();
    RemoveBtn.remove();
    br.remove();
    EditBtn.remove();
    EnteredTask.value = ""; // clear input
    Time = "";
  });
}
let time = document.querySelector(".Time");
let a = document.querySelector("#ChangeMode");
let Mode = false;
a.addEventListener("click", () => {
  body.style.backgroundColor = Mode ? "#8ccdeb" : "black";
  Container.style.backgroundColor = Mode ? "pink" : "grey";
  ResetBtn.style.backgroundColor = Mode ? "darkblue" : "black";
  AddBtn.style.backgroundColor = Mode ? "darkblue" : "black";
  EnteredTask.style.backgroundColor = Mode ? "#d4eaf5" : "white";
  Icon.classList.add(Mode ? "fa-sun" : "fa-moon");
  Icon.classList.remove(Mode ? "fa-moon" : "fa-sun");
  Icon.style.color = Mode ? "yellow" : "white";
  time.style.backgroundColor = Mode ? "white" : "black";
  
  Mode = !Mode;
});
