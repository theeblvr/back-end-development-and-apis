import apiRouter from "./routes/api.routes.js";
import { notFoundHandler, finalErrorHandler } from "./middleware/error.middleware.js";
import express from "express";
const app = express();
const port = 3000;

app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(finalErrorHandler);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`);
});