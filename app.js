import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

import express from 'express'


const app = express();

app.get('/split-payments/compute', (req, res) => {
        res.send("split payments")
})


export default app;