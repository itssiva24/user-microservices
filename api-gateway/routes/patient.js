import axios from "axios";
import express from "express"
const router = express.Router();

const PATIENT_SERVICE_URL = "http://localhost:7002"


router.post('/signup', async (req, res) => {
    const response = await axios.post(`${PATIENT_SERVICE_URL}/patients`, {
        ...req
    })
    return res.json(response)
});
router.post('/signin', async (req, res, next) => {
    const response = await axios.post(`${PATIENT_SERVICE_URL}/sessions`, {
        ...req
    })

    req.session.userSession = response.id
    return res.json(response)
	
});

module.exports = router;
