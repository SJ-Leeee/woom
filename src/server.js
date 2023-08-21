import http from "http";
import express from "express";
import SocketIO from "socket.io";
import { eventNames } from "process";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("http://localhost:3000을 열었습니다.");

const server = http.createServer(app);
const io = SocketIO(server);
// http 와 ws를 동시에 실행
io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`socket Event : ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });
});

server.listen(3000, handleListen);

// 여기서의 소켓은 브라우저와의 연결
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   console.log(`conneted to Browser 현재 ${sockets.length}`);
//   socket.on("close", () => console.log("연결끝"));
//   socket.on("message", (message) => {
//     // const translatedMessageData = JSON.parse(message);
//     message = message.toString("utf-8");
//     const msgObj = JSON.parse(message);
//     switch (msgObj.type) {
//       case "new_message":
//         sockets.forEach((soc) => soc.send(`${socket.nickname} : ${msgObj.payload}`));
//         break;
//       case "nickname":
//         socket["nickname"] = msgObj.payload;
//     }
//   });
// });

// {
//   type:"message",
//   payload:"hello 모두들"
// }
// {
//   type:"nickname",
//   payload:"neo"
// }
