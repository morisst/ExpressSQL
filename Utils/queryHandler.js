import { addErrorLogs, addQueryFai, addQuerySuc } from "../Logging/CsvLogs/csvLogging.js";
import logger from "../Logging/Logs/logger.js";

async function queryHandler(req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            logger.error("DATABASE: "+err)
           addErrorLogs("DATABASE")
           res.status(502).json({ error: err })
           return;
        }
        logger.info("Connected to database");
        connection.query(req.query,
            (error, results, fields) => {
                connection.release();
                if (error) {
                    res.status(500).json({ error: error.message })
                    addQueryFai(req.query, error.message)
                    addErrorLogs("QUERY", error.message)
                    logger.warn("Query execution failed");
                    return;
                }
                addQuerySuc(req.query)
                logger.info("Query resolved successfully");
                res.status(200).json({ results })
                return;
            });
    });

}

export default queryHandler