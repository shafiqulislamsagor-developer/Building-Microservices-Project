import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import { InventoryUpdateDTOShema } from "@/schemas";

const updateInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // check if the inventory exists
    const { id } = req.params;
    const inventory = await prisma.inventory.findUnique({
      where: { id },
    });

    if (!inventory)
      return res.status(404).json({
        error: "Inventory not found",
      });

    // update the inventory
    const parsedBody = InventoryUpdateDTOShema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(404).json({
        error: parsedBody.error.errors,
      });

    // find the last history
    const lastHistory = await prisma.history.findFirst({
      where: { inventoryId: id },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    next(err);
  }
};
