const path = require('path');
const express = require('express')
const mongoose = require("mongoose");
const app = express()
require('dotenv').config()

mongoose.connect(process.env.DB, {
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("mongodb running")
})

//middlewares
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true}))
// app.use(express.static('node_modules'))
// app.use(express.static('public'))
// app.use(express.static(path.resolve(__dirname, 'build')));


//routes

app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/center", require('./routes/center.routes'))
app.use("/api/room", require('./routes/room.routes'))
app.use("/api/schedule", require('./routes/schedule.routes'))



// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.PORT || 8000, () => console.log(`running on ${process.env.PORT}`))



