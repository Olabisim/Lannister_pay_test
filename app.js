// import {dirname} from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename);
import { split_payment } from './controllers/index.js'

import express from 'express'
import responseTime from 'response-time';
import cors from 'cors';


const app = express();


// CORS PROBLEM ALLOWING FRONTEND TO PROCESS HTTP METHODS

app.use(cors());

app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Request methods you wish to allow
        res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );

        // Request headers you wish to allow
        res.setHeader(
                "Access-Control-Allow-Headers",
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
        );
        next();
});

// CORS PROBLEM END


app.use(express.json());

app.use(responseTime((req, res, time) => {
        console.log(`${req.method} ${req.url} ${time}ms`);
}))

app.post('/split-payments/compute', split_payment)

// unhandled routes 

app.all("*", (req, res, next) => {
        res.status(404).json({
                status: "fail",
                message: `Can't find ${req.url} on this server`
        })
})

export default app;