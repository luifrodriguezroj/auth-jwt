import express from "express";
import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from 'typeorm';
import authRoutes from './routes/auth';

// Create a new express application instance
const app: express.Application = express();

// Connects to the Database
createConnection();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set all routes from routes folder
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my authentication API",
  });
});
app.use('/auth', authRoutes);

export default app;