import express from "express";
import mongoose from "mongoose";

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})