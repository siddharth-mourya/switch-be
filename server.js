import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import logger from "./config/logger.js";

const app = express();

// Calling to initiate .env parsing
dotenv.config();

// Connect to DB
connectToDB();

// Middlewares

// Routes
app.get("/", (req, res) => {
    res.send("hello welcome")
})

app.listen(process.env.PORT, () => {
    logger.info(`server started successfully on port ${process.env.PORT}`)
})