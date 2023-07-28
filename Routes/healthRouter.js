import express from "express";
import { healthLogger } from "../Logging/Logs/logger.js";
import { pool } from "../Utils/db.js";

const router  = express.Router();

const checkdatabaseconnection = (req, res, next) => {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            req.healthmsg = {
                ok: false,
                msg: "Database Not Connected"
            };
            next();
            return;
        }
        connection.release();
        req.healthmsg = {
            ok: true,
            msg: "Database Connected"
        };
        next();
    });
};

const healthCheck = {
    // eslint-disable-next-line no-undef
    uptime: process.uptime(),
    // eslint-disable-next-line no-undef
    responseTime: process.hrtime(),
    health: "OK",
    timeStamp: Date.now()
};

router.get("/", checkdatabaseconnection, async(req, res) => {
    res.status(200).json({
        ...healthCheck,
        databaseHealth: req.healthmsg
    });
});


const healthLogging = async() => {
    try {
        const p = await pool();
        p.getConnection(function (err, connection) {
            if (err) {
                healthLogger.error(` Database error: ${err} `);
                return;
            }
            healthLogger.info("Database connection health is OK");
            connection.release();
        });
        healthLogger.info (`Service Health: ${JSON.stringify(healthCheck)}`);
    } catch (error) {
        healthLogger.error (`Service Health: ${error}`);
    }
};

export {router as healthRouter, healthLogging};