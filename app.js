import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);
import { split_payment } from './controllers/index.js'

import express from 'express'
import responseTime from 'response-time';


const app = express();

app.use(express.json());
app.use(responseTime((req, res, time) => {
        console.log(`${req.method} ${req.url} ${time}ms`);
}))

app.post('/split-payments/compute', split_payment)


export default app;