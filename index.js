import express from 'express'
import { getRouteRouter } from './Routes/getRoute.js';
import connect from './services/db.js';
import { setterRouter } from './Routes/setterRoute.js';
import { updateRouter } from './Routes/updateRouter.js';
import { dropRouter } from './Routes/dropRouter.js';


const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);



app.use("/", connect, getRouteRouter);

app.use("/create", connect, setterRouter);

app.use("/update", connect, updateRouter);

app.use("/drop", connect, dropRouter);

app.listen(8000, ()=>{console.log("Running")}, )