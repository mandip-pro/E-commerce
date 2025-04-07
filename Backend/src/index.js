import express, { json } from "express";
import webRoute from "./ROuter/web.js"; 
import cors from "cors";
import Database from "./Database/Database.js";
import cookieParser from 'cookie-parser'
const app = express();
app.use(express.json());
app.use(express.static('Public'))
app.use(cors());
app.use(cookieParser())
Database.connection()

app.use('/api',webRoute)


app.listen(3000, () => {
  console.log("http://127.0.0.1:3000/api/login");
});
