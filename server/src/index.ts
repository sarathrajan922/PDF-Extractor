import express, { Application } from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import errorHandleMiddleware from "./middleware/errorHandleMiddleware";
const app: Application = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const sever = http.createServer(app);

const PORT = 8000;

sever.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
  });


  app.use(errorHandleMiddleware);