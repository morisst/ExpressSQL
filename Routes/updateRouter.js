import express from 'express'
import { insertQuery, newTableQuery, updateRowQuery, updateTableQuery } from '../helpers.js';
import queryHandler from '../queryHandler.js';

const router = express.Router();


router.put('/table', async(req, res, next)=>{
    const {table, type, colName, oldColName, dataType} =  req.body
    const query = updateTableQuery(table, type, colName, oldColName, dataType);
    req.query = query;
    next()
}, queryHandler)


router.put('/row', async(req, res, next)=>{
    const {table, cols, newValues , where} =  req.body
    const query = updateRowQuery(table, cols, newValues , where);
    req.query = query;
    console.log(query);
    next()
}, queryHandler)



export {router as updateRouter}