import express from "express";
import { updateRowQuery, updateTableQuery } from "../Utils/queryMaker.js";
import { addErrorLogs } from "../Logging/CsvLogs/csvLogging.js";
import logger from "../Logging/Logs/logger.js";

const router = express.Router();


router.put("/table", async (req, res, next) => {
    const { table, type, colName, oldColName, dataType } = req.body;
    if (table && type && colName && oldColName && dataType) {
        const query = updateTableQuery(table, type, colName, oldColName, dataType);
        req.query = query;
        next();
    } else {
        logger.warn("Improper parameters in request body");
        addErrorLogs("REQUEST", "Improper parameters in request body");
        res.status(400).json({ error: "Improper parameters in request body" });
    }
});


router.put("/row", async (req, res, next) => {
    const { table, cols, newValues, where } = req.body;
    if (table && cols && newValues && where) {
        const query = updateRowQuery(table, cols, newValues, where);
        req.query = query;
        next();
    } else {
        logger.warn("Improper parameters in request body");
        addErrorLogs("REQUEST", "Improper parameters in request body");
        res.status(400).json({ error: "Improper parameters in request body" });
    }

});



export { router as updateRouter };