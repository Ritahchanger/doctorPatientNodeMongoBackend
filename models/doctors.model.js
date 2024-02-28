const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
