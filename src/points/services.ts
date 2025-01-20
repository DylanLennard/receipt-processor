import { Receipt } from "../receipts/types";
import { POINTS_MAP } from "../points/dataStore";

const DAY_REGEX = /\d{4}-\d{2}-(\d{2})/;
const TIME_REGEX = /(\d{2}):(\d{2})/;

/*
  gets the points associated with a receipt ID
  @param receiptId: uuid representing the receipt in question
  @returns: the number of points for the receiptId
  @throws: an error if the receiptId is not in the POINTS_MAP
*/
export function getReceiptPointsService(receiptId: string): number {
  if (!POINTS_MAP.has(receiptId)) {
    throw new Error("receipt ID not found in data store");
  }
  return POINTS_MAP.get(receiptId);
}

/*
  generates the receipt points and writes it to the map storing receiptID -> points
  @param id: uuid of a receipt
  @param payload: the receipt metadata used to determine number of points
*/
export function generateReceiptPointsService(id: string, payload: Receipt) {
  let points = 0;

  const retailerName = payload.retailer.replace(/[^a-zA-Z0-9]/g, '');
  points += retailerName.length;

  const total = payload.total;
  if (total % 1 === 0) {
    points += 50;
  }

  if (total % 0.25 === 0) {
    points += 25;
  }

  const items = payload.items;
  points += Math.floor(items.length / 2) * 5;

  // I am assuming by "trimmed length" we mean trimming the beginning and ending whitespace. 
  // If we wanted to strip all whitespace, we would use .replace(/\s+/g, '') rather than trim();
  for (let i = 0; i < items.length; i++) {
    const description = items[i].shortDescription.trim();

    if (description.length % 3 === 0) {
      const price = items[i].price;
      points += Math.ceil(price * 0.2);
    }
  }

  /* 
    :suspicious: can't tell if trolling or if this would've actually worked?!
    We'll never know :smirk:
    if (total > 10.00){
      points += 5
    } 
  */

  const purchaseDate = payload.purchaseDate;
  const dayMatch = purchaseDate.match(DAY_REGEX);
  if (dayMatch && (Number(dayMatch[1]) % 2 !== 0)) {
    points += 6;
  }

  const purchaseTime = payload.purchaseTime;
  const timeMatch = purchaseTime.match(TIME_REGEX);
  if (timeMatch) {
    const hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2]);

    const inTimeWindow = hour >= 14 && hour <= 16 && minute !== 0;
    if (inTimeWindow) {
      points += 10;
    }
  }

  POINTS_MAP.set(id, points);
}