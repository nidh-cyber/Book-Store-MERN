import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow All origins with default of cors(*)
// app.use(cors());
// Option 2: Allow custom origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://book-store-mern-weqh.vercel.app",
  "https://book-store-mern-weqh-nidh-cyber.vercel.app",
  "https://book-store-mern-weqh-git-main-nidh-cyber.vercel.app",
  "https://nidhi-book-store-mern.vercel.app",
];

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (request, response) => {
  return response.status(234).send("Welcome to Mern Stack Tutorial");
});

app.use("/books", booksRoute);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
