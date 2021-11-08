const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    id: String,
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    staffID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    clinicID: {
        type: Schema.Types.ObjectId,
        ref: "Clinic"
    },
    appointmentID: {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
    },
    remarks: String
})

module.exports = mongoose.model("Complaint", complaintSchema)
