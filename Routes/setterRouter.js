import express from 'express'
import { insertQuery, newTableQuery } from '../Utils/queryMaker.js';
import queryHandler from '../Utils/queryHandler.js';
import { addErrorLogs } from '../Logging/CsvLogs/csvLogging.js';
import logger from '../Logging/Logs/logger.js';

const router = express.Router();


router.post('/table', async (req, res, next) => {
    const { name, columns } = req.body
    if (name && columns) {
        const query = newTableQuery(name, columns);
        req.query = query;
        next()
    } else {
        logger.warn("Improper parameters in request body")
        addErrorLogs("REQUEST", "Improper parameters in request body")
        res.status(400).json({ error: "Improper parameters in request body" })
    }
})


router.post('/row', async (req, res, next) => {
    const { table, values, cols } = req.body
    if (table && values && cols) {
        const query = insertQuery(table, values, cols);
        req.query = query;
        next()
    } else {
        logger.warn("Improper parameters in request body")
        addErrorLogs("REQUEST", "Improper parameters in request body")
        res.status(400).json({ error: "Improper parameters in request body" })
    }
})





export { router as setterRouter }