import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import { ErrorMiddleware } from "./middleware/error_middleware";
import authRoute from "./feature/auth/authRoute";
import specialistRoute from "./feature/spectialist/specialistRoute";
import ambulanceRoute from "./feature/ambulance/ambulanceRoute";
import disscussionRoute from "./feature/forum/disscussion/disscussionRoute";
import commentRoute from "./feature/forum/commet/commentRoute";

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoute);
app.use("/specialist", specialistRoute);
app.use("/ambulance", ambulanceRoute);
app.use("/disscussion", disscussionRoute);
app.use("/comment", commentRoute);

app.use(ErrorMiddleware.notFound);
app.use(ErrorMiddleware.returnError);

export default app;
