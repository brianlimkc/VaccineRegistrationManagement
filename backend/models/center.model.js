const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const centerSchema = new Schema({
    id: String,
    name: String,
    shotType: {
        type: String,
        default: "Pfizer",
        enum: ["Pfizer", "Moderna","SinoVac"]
    },    
    roomArray: [{
        type: Schema.Types.ObjectId,
        ref: "Room"
    }],
    streetAddress: String,
    postalCode: String,
    contactNumber: String,
})



module.exports = mongoose.model("Center", centerSchema);