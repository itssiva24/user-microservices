import axios from "axios";
import express from "express"
const router = express.Router();

const DOCTOR_SERVICE_URL = "http://localhost:7001"


router.post('/signup', async (req, res) => {
    const response = await axios.post(`${DOCTOR_SERVICE_URL}/doctors`, {
        ...req
    })
    return res.json(response)
});
router.post('/signin', async (req, res, next) => {
    const response = await axios.post(`${DOCTOR_SERVICE_URL}/sessions`, {
        ...req
    })
    req.session.userSession = response.id
    return res.json(response)
	
});

module.exports = router;