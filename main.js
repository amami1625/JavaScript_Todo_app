import { Todo } from "./Todo.js";

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  Todo.of(input.value);
});
