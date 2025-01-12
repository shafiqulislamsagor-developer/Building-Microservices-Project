import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { createInventory } from "./controllers";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

// routes
app.post("/inventories", createInventory);

// 404 handler

app.use((_req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.log(err.stack);
  res.status(404).json({
    message: "Internal Server Error",
  });
});

const port = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || "inventory-service";

app.listen(port, () => {
  console.log(`${serviceName} is running on port ${port}`);
});
