import { Receipt } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { RECEIPT_MAP } from "./dataStore";

export function createReceipt(payload: Receipt): string {
  // TODO: add validation
  const id = uuidv4();
  RECEIPT_MAP.set(id, payload);
  return id;
}