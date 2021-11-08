const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    contactNum: String,    
    dateOfBirth: Date,
    consentGiven: Boolean,
    healthIssues: String,
    nric: String,    
    isStaff: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstShotTaken: Boolean,
    firstShotApptID: {
        type: Schema.Types.ObjectId,    
        ref: "Appointment"
    },
    secondShotTaken: Boolean,
    secondShotApptID: {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
    },
    VaccinationStatus: {
        type: String,
        default: "Unvaccinated",
        enum: ["Unvaccinated","Partially Vaccinvated","Vaccinated"]
    }, 
    staffType: {
        type: String,
        default: "null",
        enum: ["null","GP","Doctor","Staff"]
    },
    qualificationType: String,
    assignedClinic: String,
    approved: {
        type: Boolean,
        default: false
    },
    rosterArray: [{
        type: Schema.Types.ObjectId,    
        ref: "Roster"
    }]
})

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema)