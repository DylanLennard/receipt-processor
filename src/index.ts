import express, { Express} from "express";
import { processReceipts } from "./receipts/handlers";
import { getReceiptPoints } from "./points/handlers";


const app: Express = express();
const port = '8080'; // would be 80 for HTTP, 443 for HTTPS.
app.use(express.json());

app.post('/receipts/process', processReceipts);
app.get('/receipts/:receiptId/points', getReceiptPoints);

app.listen(port);