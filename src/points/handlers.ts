import { Request, Response } from "express";

import { PointsResponse } from "./responses";
import { getReceiptPointsService } from "./services";

export async function getReceiptPoints(req: Request, res: Response) {
  if (!req || !req.params || !req.params.receiptId) {
    res.status(400).json({error: "missing required parameters"})
  }

  const receiptId = req.params.receiptId;

  try {
    const points = getReceiptPointsService(receiptId);
    res.status(200).json({points: points} as PointsResponse);
  } catch {
    res.status(404).json({error: "receipt ID not found in data store"});
  }
}