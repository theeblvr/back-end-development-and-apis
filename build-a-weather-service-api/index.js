import path from "path";
import { fileURLToPath } from "url";
import apiRoute from "./weather.js";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/weather", apiRoute);


app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/info", (req, res) => {
    res.json({
        name: "Weather Service Api",
        version: "1.0.0",
        endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"]
    });
});

app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: "Active"
    });
});

app.get("/docs", (req, res) => {
    res.redirect("/api/info");
});

app.get("/api/greet/:name", (req, res) => {
    const name = req.params.name;

    res.status(200).json({
        message: `Hello, ${name}!`
    });
});

app.route("/api/data")
    .get((req, res) => {
        res.status(200).json({ process: "Fetching user data" });
    })
    .post((req, res) => {
        res.status(201).json({ process: "Updating user data"})
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});