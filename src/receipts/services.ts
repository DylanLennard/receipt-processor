import { Receipt } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { RECEIPT_MAP } from "./dataStore";

/*
  creates a record of the receipt's UUID in the storage map
  @payload: the receipt metadata
  @returns: the id of the receipt
*/
export function createReceiptService(payload: Receipt): string {
  const id = uuidv4();
  RECEIPT_MAP.set(id, payload);
  return id;
}
