import express from 'express'
import { dropRowQuery, dropTableQuery, insertQuery, newTableQuery, updateTableQuery } from '../helpers.js';
import queryHandler from '../queryHandler.js';

const router = express.Router();


router.delete('/table', async(req, res, next)=>{
    const {table} =  req.body
    const query = dropTableQuery(table);
    req.query = query;
    next()
}, queryHandler)


router.delete('/row', async(req, res, next)=>{
    const {table, where} =  req.body
    const query = dropRowQuery(table, where);
    req.query = query;
    console.log(query)
    next()
}, queryHandler)





export {router as dropRouter}