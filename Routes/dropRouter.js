import express from 'express'
import { dropRowQuery, dropTableQuery, insertQuery, newTableQuery, updateTableQuery } from '../Utils/queryMaker.js';
import queryHandler from '../Utils/queryHandler.js';
import { addErrorLogs } from '../Logging/CsvLogs/csvLogging.js';
import logger from '../Logging/Logs/logger.js';

const router = express.Router();


router.delete('/table', async (req, res, next) => {
    const { table } = req.body
    if (table) {
        req.query = dropTableQuery(table);
        next()
    } else {
        logger.warn("Improper parameters in request body")
        addErrorLogs("REQUEST", "Improper parameters in request body")
        res.status(400).json({ error: "Improper parameters in request body" })
    }
})


router.delete('/row', async (req, res, next) => {
    const { table, where } = req.body
    if (table && where) {
        const query = dropRowQuery(table, where);
        req.query = query;
        next()
    } else {
        logger.warn("Improper parameters in request body")
        addErrorLogs("REQUEST", "Improper parameters in request body")
        res.status(400).json({ error: "Improper parameters in request body" })
    }
})





export { router as dropRouter }