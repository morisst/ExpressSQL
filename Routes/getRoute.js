import express from 'express'
import { readQuery } from '../helpers.js';
import queryHandler from '../queryHandler.js';

const router = express.Router();


router.get('/', async(req, res, next)=>{
    const {all, selectColumn, where, distinct, table} =  req.body
    const query = readQuery(all, selectColumn, where, distinct, table);
    req.query = query;
    next()
}, queryHandler)





export {router as getRouteRouter}