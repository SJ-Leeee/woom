const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("somewon joined!!");
});

// ws로 구현한것들
// const socket = new WebSocket(`ws://${window.location.host}`);
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickForm = document.querySelector("#nick");

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

// socket.addEventListener("open", () => {
//   console.log("conneted to server");
// });
// // 여기서의 소켓은 백엔드와의 연결
// socket.addEventListener("message", (message) => {
//   const li = document.createElement("li");
//   li.innerText = message.data;
//   messageList.append(li);
//   // const translatedMessageData = message.toString();
//   // console.log(message.data);
// });

// socket.addEventListener("close", () => {
//   console.log("연결이 끊겼어요");
// });

// // setTimeout(() => {
// //   socket.send("hello my browser");
// // }, 3000);

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   // const message = JSON.stringify(input.value);
//   socket.send(makeMessage("new_message", input.value));
//   input.value = "";
// }
// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
//   // nickForm.style.display = "none";
// }
// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);
