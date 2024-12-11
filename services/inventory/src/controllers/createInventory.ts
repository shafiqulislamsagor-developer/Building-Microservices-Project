import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { InvertoryCreateDTOSchema } from "../schemas";

const createInvertory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = InvertoryCreateDTOSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
    }

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

    // return res.status(201).json(inventory);
  } catch (err) {
    next(err);
  }
};

export default createInvertory;
