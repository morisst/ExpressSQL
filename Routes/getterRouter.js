import express from "express";
import { getAllTables, readQuery } from "../Utils/queryMaker.js";
import { addErrorLogs } from "../Logging/CsvLogs/csvLogging.js";
import logger from "../Logging/Logs/logger.js";

const router = express.Router();


router.get("/", async (req, res, next) => {
    const { all, selectColumn, where, distinct, table } = req.body;
    if (selectColumn && where && distinct && table) {
        const query = readQuery(all, selectColumn, where, distinct, table);
        req.query = query;
        next();
    } else {
        logger.warn("Improper parameters in request body");
        addErrorLogs("REQUEST", "Improper parameters in request body");
        res.status(400).json({ error: "Improper parameters in request body" });
    }
});

router.get("/alltables", async (req, res, next) => {
    req.query = getAllTables();
    next();
});


export { router as getRouter };