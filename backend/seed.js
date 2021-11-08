require('dotenv').config()
const mongoose = require("mongoose");
const clinicModel = require("./models/center.model")

mongoose.connect(process.env.DB, {
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("mongodb running")
})

clinicModel.insertMany([
    {
        id: "u-0001",
        name: "clinic a",
        shotType: "Pfizer",
        slots: 5,
        startTime: 9,
        endTime: 12,
        staffAssigned: [],
        streetAddress: "",
        postalCode: 000000,
        contactNumber: 00000000,

}
])
