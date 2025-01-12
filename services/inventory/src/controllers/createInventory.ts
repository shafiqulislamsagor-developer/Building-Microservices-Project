import prisma from "@/prisma";
import { InventoryCreateDTOSchema } from "@/schemas";
import { NextFunction, Request, Response } from "express";

const createInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Validate the request body
    const parsedBody = InventoryCreateDTOSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
    }

    // Create inventory
    const inventory = await prisma.inventory.create({
      data: {
        ...parsedBody.data,
        histories: {
          create: {
            actionType: "IN",
            quantityChanged: parsedBody.data.quantity,
            lastQuantity: 0,
            newQuantity: parsedBody.data.quantity,
          },
        },
      },
      select: {
        id: true,
        quantity: true,
      },
    });
    return res.status(200).json(inventory);
  } catch (err) {
    next(err);
  }
};

export default createInventory;
