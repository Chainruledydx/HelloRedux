import { createStore } from "redux";

// store = 데이터 저장소, 변화하기 때문에 관리하는 데이터를 넣어두고 관리함
// store에서 디폴트값과 함께 데이터 생성 -> dispatch를 통한 action의 type으로 명령하여 state를 modify.
// 해당 state가 바뀔때마다 참조하고 싶으면 subscribe(<행동>)

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADDON = () => {
  countStore.dispatch({ type: "ADD" });
};

const MINUSON = () => {
  countStore.dispatch({ type: "MINUS" });
};

//reducer란, store내의 data를 modify하는 함수를 말합니다.
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case "ADD":
      return count + 1;
    case "MINUS":
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener("click", ADDON);
minus.addEventListener("click", MINUSON);
