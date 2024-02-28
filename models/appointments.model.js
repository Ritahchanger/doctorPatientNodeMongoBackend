const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    patientName: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
});

const Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports=Appointment;