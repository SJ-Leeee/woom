import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");

app.get("/", (req, res) => {
  res.render("home");
});
app.listen(3000, console.log("3000포트로 서버가 열렸습니다."));
