import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);
import { split_payment } from './controllers/index.js'

import express from 'express'


const app = express();

app.use(express.json());

app.post('/split-payments/compute', split_payment)


export default app;