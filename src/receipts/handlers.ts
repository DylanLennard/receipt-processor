import {Request, Response } from "express";

import { ReceiptSchema, ReceiptsResponse } from "./types";
import { createReceipt } from "./services";

import { generateReceiptPointsService } from '../points/services'

/*
  POST handler for processing receipts
  - creates the receipt and its ID
  - generates and stores the points associated with that receipt
*/
export async function processReceipts(req: Request, res: Response) {
  let receipt;
  try {
    receipt = ReceiptSchema.parse(req.body);
  } catch {
    res.status(400).json({error: "body of request is malformed or missing"});
    return;
  }

  const id = createReceipt(receipt);
  generateReceiptPointsService(id, receipt);
  res.status(200).json({ id: id } as ReceiptsResponse);
};