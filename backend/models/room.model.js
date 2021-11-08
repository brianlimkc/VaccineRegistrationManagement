const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    id: String,
    name: String,
    centerID: {
        type: Schema.Types.ObjectId,    
        ref: "Center"
    },
    centerName: String,
    rosterArray: [{
        type: Schema.Types.ObjectId,    
        ref: "Roster"
    }]
})

module.exports = mongoose.model("Room", roomSchema)
