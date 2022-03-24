import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";


const PORT = accessEnv("PORT", 7000);

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
  })
);

app.use(injectSession);

app.listen(PORT, () => {
  console.info(`API gateway listening on ${PORT}`);
});