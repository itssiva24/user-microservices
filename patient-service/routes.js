import { Patient, PatientSession } from "./db/models.js";
import { passwordCompareSync, hashPassword, generateUUID } from "./utils/index.js";
import dateFns from "date-fns"

const { addHours } = dateFns;

const USER_SESSION_EXPIRY_HOURS = 1;


const setupRoutes = app => {
    app.post("/sessions", async (req, res, next) => {
      if (!req.body.nhid || !req.body.password) {
        return next(new Error("Invalid body!"));
      }
  
      try {
        const user = await Patient.findOne({ email: req.body.nhid });
  
        if (!user) return next(new Error("Invalid NHID!"));
  
        if (!passwordCompareSync(req.body.password, user.passwordHash)) {
          return next(new Error("Incorrect password!"));
        }
  
        const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
  
        const sessionToken = generateUUID();
  
        const userSession = await PatientSession.create({
          expiresAt,
          id: sessionToken,
          nhid: user.nhid
        });
  
        return res.json(userSession);
      } catch (e) {
        return next(e);
      }
    });
  
    app.delete("/sessions/:sessionId", async (req, res, next) => {
      try {
        const userSession = await PatientSession.findOne(({id: req.params.sessionId}));
  
        if (!userSession) return next(new Error("Invalid session ID"));
  
        await userSession.destroy();
  
        return res.end();
      } catch (e) {
        return next(e);
      }
    });
  
    app.get("/sessions/:sessionId", async (req, res, next) => {
      try {
        const userSession = await PatientSession.findOne({id: req.params.sessionId});
  
        if (!userSession) return next(new Error("Invalid session ID"));
  
        return res.json(userSession);
      } catch (e) {
        return next(e);
      }
    });
  
    app.post("/patients", async (req, res, next) => {
      if (!req.body.nhid || !req.body.password) {
        return next(new Error("Invalid body!"));
      }
  
      const {gender, name, address, phone} = req.body

      try {
        const newUser = await Patient.create({
          nhid,
          password: hashPassword(req.body.password),
          gender,
          name,
          address,
          phone
        });
  
        return res.json(newUser);
      } catch (e) {
        return next(e);
      }
    });
  
    app.get("/patients/:patientId", async (req, res, next) => {
      try {
        const user = await Patient.findOne({nhid: req.params.patientId});
  
        if (!user) return next(new Error("Invalid patient ID"));
  
        return res.json(user);
      } catch (e) {
        return next(e);
      }
    });
  };
  
  export default setupRoutes;