import { createStore } from "redux";

const form = document.querySelector("form");
const ul = document.querySelector("ul");
const input = document.querySelector("input");

const ADDTODO = "TODOS/ADDTODO";
const DELETETODO = "TODOS/DELETETODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADDTODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    // U SHOULD NEVER MUTATE THE STATE (불변성), ONLY RETURN NEW THING
    case DELETETODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log("oh shit"));

const deleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.addEventListener("click", deleteToDo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const addToDo = (text) => {
  store.dispatch({ type: ADDTODO, text });
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  addToDo(toDo);
  input.value = "";
};

form.addEventListener("submit", onSubmit);
