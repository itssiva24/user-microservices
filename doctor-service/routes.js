import { Doctor, DoctorSession } from "./db/models.js";
import { passwordCompareSync, hashPassword, generateUUID } from "./utils/index.js";
import dateFns from "date-fns"

const { addHours } = dateFns;

const USER_SESSION_EXPIRY_HOURS = 1;


const setupRoutes = app => {
    app.post("/sessions", async (req, res, next) => {
      if (!req.body.regId || !req.body.password) {
        return next(new Error("Invalid body!"));
      }
  
      try {
        const user = await Doctor.findOne({ regId: req.body.regId });
  
        if (!user) return next(new Error("Invalid regId!"));
  
        if (!passwordCompareSync(req.body.password, user.passwordHash)) {
          return next(new Error("Incorrect password!"));
        }
  
        const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
  
        const sessionToken = generateUUID();
  
        const userSession = await DoctorSession.create({
          expiresAt,
          id: sessionToken,
          regId: user.regId
        });
  
        return res.json(userSession);
      } catch (e) {
        return next(e);
      }
    });
  
    app.delete("/sessions/:sessionId", async (req, res, next) => {
      try {
        const userSession = await DoctorSession.findOne(({id: req.params.sessionId}));
  
        if (!userSession) return next(new Error("Invalid session ID"));
  
        await userSession.destroy();
  
        return res.end();
      } catch (e) {
        return next(e);
      }
    });
  
    app.get("/sessions/:sessionId", async (req, res, next) => {
      try {
        const userSession = await DoctorSession.findOne({id: req.params.sessionId});
  
        if (!userSession) return next(new Error("Invalid session ID"));
  
        return res.json(userSession);
      } catch (e) {
        return next(e);
      }
    });
  
    app.post("/doctors", async (req, res, next) => {
      if (!req.body.regId || !req.body.password) {
        return next(new Error("Invalid body!"));
      }
  
      const {description, name, regId, availability} = req.body

      try {
        const newUser = await Doctor.create({
          regId,
          password: hashPassword(req.body.password),
          name,
          description,
          availability,
        });
  
        return res.json(newUser);
      } catch (e) {
        return next(e);
      }
    });
  
    app.get("/doctor/:doctorId", async (req, res, next) => {
      try {
        const user = await Doctor.findOne({regId: req.params.doctorId});
  
        if (!user) return next(new Error("Invalid doctor ID"));
  
        return res.json(user);
      } catch (e) {
        return next(e);
      }
    });
  };
  
  export default setupRoutes;