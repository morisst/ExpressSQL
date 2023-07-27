import mysql from 'mysql'
import config from './config.js';
import { addErrorLogs } from '../Logging/CsvLogs/csvLogging.js';
import logger from '../Logging/Logs/logger.js';


async function connect(req, res, next) {
    try {
        const pool = mysql.createPool({
            connectionLimit: 10,
            ...config.db
        })
        req.pool = pool;
        next()
    } catch (error) {
        console.log(error)
        logger.error("DATABASE: " + error)
        addErrorLogs("DATABASE", error);
        res.status(500).json(error)
    }
}

export default connect