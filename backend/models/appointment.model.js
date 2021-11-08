const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({    
    date: Date,
    time: Number,
    rosterID: {
        type: Schema.Types.ObjectId,
        ref: "Roster"
    },
    patientID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

module.exports = mongoose.model("Appointment", appointmentSchema);