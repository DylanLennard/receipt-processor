import { z } from "zod";

export const ItemSchema = z.object({
  shortDescription: z.string(),
  price: z.coerce.number(), // "6.49" input
});

export const ReceiptSchema = z.object({
  retailer: z.string(),
  purchaseDate: z.string().date(), // 2022-01-02
  purchaseTime: z.string(), // 13:01 (can't use "time" check here because we need 00:00:00 format)
  items: z.array(ItemSchema),
  total: z.coerce.number(), // "6.49" input
});

export type Item = z.infer<typeof ItemSchema>;
export type Receipt = z.infer<typeof ReceiptSchema>;

export interface ReceiptsResponse {
  id: string; // uuid4
}