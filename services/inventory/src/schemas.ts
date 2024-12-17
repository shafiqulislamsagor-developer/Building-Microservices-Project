import { ActionType } from "@prisma/client";
import { z } from "zod";

export const InvertoryCreateDTOSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  quantity: z.number().int().optional().default(0),
});

// export type InvertoryCreateDTO = z.infer<typeof InvertoryCreateDTOSchema>;

export const InventoryUpdateDTOSchema = z.object({
  quantity: z.number().int(),
  actionType: z.nativeEnum(ActionType),
});
