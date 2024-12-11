import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  try {
    res.status(200).json({ status: "OK" });
  } catch {
    console.log("error");
  }
});

// 404 handler

app.use((req, res) => {
  res.status(404).json({ status: "Not Found" });
});

// Error handler

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ status: "Internal Server Error" });
// });

const port = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || "inventory-service";

app.listen(port, () => {
  console.log(`${serviceName} is running on ${port}`);
});
