import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import dbConfig from './config/db.config';
import BaseRouter from "./routes";

dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to starter kit application." });
});

app.use(BaseRouter);

// database
mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to DB...");
    })
    .catch(err => {
        console.error("Cannot connect to the database!", err);
        process.exit();
    });


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

export default app;
