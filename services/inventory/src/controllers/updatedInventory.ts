import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { InventoryUpdateDTOSchema } from "../schemas";

const updatedInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const inventory = await prisma.inventory.findUnique({
      where: { id },
    });
    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }
    // update inventory
    const parseBody = InventoryUpdateDTOSchema.safeParse(req.body);
    if (!parseBody.success) {
      return res.status(400).json({ error: "Invalid inventory" });
    }

    // find the last history
    const lastHistory = await prisma.history.findFirst({
      where: { inventoryId: id },
      orderBy: { createAt: "desc" },
    });
  } catch (err) {
    next(err);
  }
};
