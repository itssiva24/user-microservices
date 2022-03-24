import mongoose from "mongoose"

const patientSchema = mongoose.Schema({
    nhid: {
        type: Number,
        ref: 'Patient'
    },
    password: {
        type: String
    },
    gender:{
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address:{
        type: String
    }
})

const patientSessionSchema = mongoose.Schema({
    id: {
        type: String
    },
    nhid: {
        type: String
    },
    expiresAt: {
        type: Date
    }
})


const Patient = mongoose.model("Patient", patientSchema)
const PatientSession = mongoose.model("PatientSession", patientSessionSchema)

export { Patient, PatientSession }