import express, { Application } from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import errorHandleMiddleware from "./middleware/errorHandleMiddleware";
const app: Application = express();
import ConfigKeys from "./common/config";


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const sever = http.createServer(app);

const PORT = ConfigKeys.PORT;

sever.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
  });


  app.use(errorHandleMiddleware);