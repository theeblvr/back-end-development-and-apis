const { inputCleaner, inputValidator } = require("./middleware.js");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/form");
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/form", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"))
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
    res.send({
        username: req.body.username,
        comment: req.body.comment
    });
});

app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${port}`);
});