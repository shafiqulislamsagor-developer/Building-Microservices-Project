import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { createInventory } from "./controllers";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.post("/inventories", createInventory);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "Not Found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ status: "Internal Server Error", error: err.message });
});

const port = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || "Inventory-Service";

app.listen(port, () => {
  console.log(`${serviceName} is running on ${port}`);
});
