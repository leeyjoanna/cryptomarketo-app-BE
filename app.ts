import express, { Response, Request } from "express";
import mongoose, { Error } from "mongoose";
import config from "./utils/config";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import path from "path";
import cors from "cors";
import router from "./controllers/api";

const app = express();

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info("connected to MongoDB");
    })
    .catch((error: Error) => {
      logger.info("error connecting to MongoDB:", error.message);
    });
}

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use("/api", router);

app.use("/*", (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
