import express, { Application } from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import errorHandleMiddleware from "./middleware/errorHandleMiddleware";
import ConfigKeys from "./common/config";
import router from "./routes/routerIndex";
const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const sever = http.createServer(app);

const PORT = ConfigKeys.PORT;

sever.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});

router(app);

app.use(errorHandleMiddleware);
