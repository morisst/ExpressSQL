import mysql from 'mysql'
import config from '../config.js';


async function connect(req, res, next) {
    try {
        const connection = mysql.createConnection(config.db);
        connection.connect(function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            req.db = connection;
            next();
        })
    } catch (error) {
         res.status(500).json(error)
    }
}

export default connect