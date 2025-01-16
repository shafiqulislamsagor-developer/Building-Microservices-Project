import { ActionType } from "@prisma/client";
import { z } from "zod";

export const InventoryCreateDTOSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  quantity: z.number().int().optional().default(0),
});

export const InventoryUpdateDTOShema = z.object({
  quantity: z.number().int(),
  actionType: z.nativeEnum(ActionType),
});
// export type InventoryCreateDTO = z.infer<typeof InventoryCreateDTOSchema>;
