const express = require("express");
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./sec/server.key'),
  cert: fs.readFileSync('./sec/server.crt'),
  passphrase: '1234'
}


const ejs = require("ejs");
const utis = require("./utils.js");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const msgArray = [
  { title: "Admin", message: "Feel free to check document.cookie on you console" },
];

app.get("/", (req, res) => {
  if (!req.headers.cookie?.includes("ADMIN_COOKIE"))
    res.cookie("VISITOR_COOKIE", "NOT_ADMIN", {
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  res.render("index", { msgArray });
});


app.post("/", (req, res) => {
  const title = req.body.titre;
  const message = req.body.message;

  console.log("Title:", title);
  console.log("Message:", message);
  msgArray.push({ title, message });

  res.render("index", { msgArray });
});

app.get("/reflected", utis.reflected);
app.get("/dom", utis.dom);
app.get("/secretAdmin", utis.secretAdmin);
app.get("/csp", utis.csp);

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});


const server = https.createServer(options, app);

server.listen(443, () => {
    console.log('HTTPS Server is running on port 3001');
});