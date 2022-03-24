import mongoose from "mongoose"

const doctorSchema = mongoose.Schema({
    regId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    availability: [{
        type: Slot
    }],
})

const doctorSessionSchema = mongoose.Schema({
    id: {
        type: String
    },
    regId: {
        type: String
    },
    expiresAt: {
        type: Date
    }
})


const Doctor = mongoose.model("Doctor", doctorSchema)
const DoctorSession = mongoose.model("DoctorSession", doctorSessionSchema)

export { Doctor, DoctorSession }