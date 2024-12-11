import { z } from "zod";

export const InvertoryCreateDTOSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  quantity: z.number().int().positive().optional().default(0),
});

export type InvertoryCreateDTO = z.infer<typeof InvertoryCreateDTOSchema>;
