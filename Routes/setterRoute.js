import express from 'express'
import { insertQuery, newTableQuery } from '../helpers.js';
import queryHandler from '../queryHandler.js';

const router = express.Router();


router.post('/table', async(req, res, next)=>{
    const {name, columns} =  req.body
    const query = newTableQuery(name, columns);
    req.query = query;
    next()
}, queryHandler)


router.post('/row', async(req, res, next)=>{
    const {table, values, cols} =  req.body
    const query = insertQuery(table, values, cols);
    req.query = query;
    next()
}, queryHandler)





export {router as setterRouter}