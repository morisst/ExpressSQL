import express from "express";
import { getRouter } from "./Routes/getterRouter.js";
import connect from "./Utils/db.js";
import { setterRouter } from "./Routes/setterRouter.js";
import { updateRouter } from "./Routes/updateRouter.js";
import { dropRouter } from "./Routes/dropRouter.js";
import queryHandler from "./Utils/queryHandler.js";
import logger from "./Logging/Logs/logger.js";
import logtheRequest from "./Logging/Logs/requestLogging.js";
import { healthLogging, healthRouter } from "./Routes/healthRouter.js";
import cron from "node-cron";

const app = express();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use("/get", logtheRequest, connect, getRouter, queryHandler);

app.use("/create", logtheRequest, connect, setterRouter, queryHandler);

app.use("/update", logtheRequest, connect, updateRouter, queryHandler);

app.use("/drop", logtheRequest, connect, dropRouter, queryHandler);

app.use("/healthcheck", logtheRequest, connect, healthRouter);

cron.schedule("*/5 * * * *", healthLogging);

app.listen(8000, () =>  logger.info("App Started Listening"));