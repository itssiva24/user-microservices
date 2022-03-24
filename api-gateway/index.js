import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 7000

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
  })
);

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use("/patientAuth", require("./routes/patient.js"))
app.use("/doctorAuth", require("./routes/doctor.js"))

app.listen(PORT, () => {
  console.info(`API gateway listening on ${PORT}`);
});