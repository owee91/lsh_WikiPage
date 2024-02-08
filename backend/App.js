const express = require("express");
var cors = require("cors");
const boardRouter = require("./boardRouter");

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.use(`/board`, boardRouter);

app.get("/", (req, res) => {
  res.send(`<h2>welcome to server</h2>`);
});

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
