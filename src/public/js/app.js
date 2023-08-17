const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("conneted to server");
});
// 여기서의 소켓은 백엔드와의 연결
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
  // const translatedMessageData = message.toString();
  // console.log(message.data);
});

socket.addEventListener("close", () => {
  console.log("연결이 끊겼어요");
});

// setTimeout(() => {
//   socket.send("hello my browser");
// }, 3000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // const message = JSON.stringify(input.value);
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  // nickForm.style.display = "none";
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
