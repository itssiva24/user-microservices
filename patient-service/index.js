import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import setupRoutes from "./routes.js";

const PORT = process.env.PORT || 7001

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
);

setupRoutes(app);

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message
  });
});

app.listen(PORT, () => {
  console.info(`Patients service listening on ${PORT}`);
});