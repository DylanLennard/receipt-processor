import express, { Express} from "express";
import { processReceipts } from "./receipts/handlers";
import { getReceiptPoints } from "./points/handlers";


const app: Express = express();
const port = '8080'; // would normally store in env vars
app.use(express.json());

app.post('/receipts/process', processReceipts);
app.get('/receipts/:receiptId/points', getReceiptPoints);

app.listen(port);