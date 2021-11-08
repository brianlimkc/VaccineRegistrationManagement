const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rosterSchema = new Schema({    
    date: Number,    
    roomID: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    centerName: String,
    roomName: String,    
    doctorID: {
        type: Schema.Types.ObjectId,        
        ref: "User",
        default: null
    },
    apptArray: [{
        type: Schema.Types.ObjectId,        
        ref: "Appointment"
    }]
        
})

module.exports = mongoose.model("Roster", rosterSchema);