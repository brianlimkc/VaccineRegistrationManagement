const router = require("express").Router();
const UserModel = require("../models/user.model");
const AppointModel = require("../models/appointment.model");
const RosterModel = require("../models/roster.model");
const RoomModel = require("../models/room.model");
const checkUser = require("../lib/check");
const { route } = require("./auth.routes");
const appointmentModel = require("../models/appointment.model");
const day = 86400000;

router.get("/availDoc/:date", async (req, res) => {
  let date = req.params.date;
  try {
    let docArray = await UserModel.find(
      { isStaff: true, approved: true },
      "-password"
    )
      .populate("rosterArray")
      .exec();

    let availDocArray = docArray.filter((doc) => {
      let docAvail = true;
      doc.rosterArray.forEach((roster) => {
        if (roster.date == date) {
          docAvail = false;
        }
      });
      return docAvail;
    });
    res.status(200).json({ availDocArray });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/availRoster/:date", async (req, res) => {
  let date = req.params.date;
  try {
    let rosterArray = await RosterModel.find({
      date: date,
      doctorID: null,
    }).exec();

    res.status(200).json({ rosterArray });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/updateRoster", async (req, res) => {
  let oldDocID = req.body.oldDoc;
  let newDocID = req.body.newDoc;
  let oldRosterID = req.body.oldRoster;
  let newRosterID = req.body.newRoster;

  try {
    if (oldDocID) {
      await UserModel.findByIdAndUpdate(oldDocID, { 
        $pull : { rosterArray: oldRosterID } 
      });
    }

    if (oldRosterID) {
      await RosterModel.findByIdAndUpdate(oldRosterID, {
        $set: { doctorID: null },
      });
    }

    if (newRosterID !== "" && newDocID !== "") {
      
        await UserModel.findByIdAndUpdate(newDocID, {
          $push: { rosterArray: newRosterID },
        }
      );
              await RosterModel.findByIdAndUpdate(newRosterID, {
          $set: { doctorID: newDocID },
        })
      ;
    }

    res.status(200).json({ message: "roster updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/docSchedule/:docID", async (req, res) => {
  let docID = req.params.docID;
  try {
    let docSchedule = await UserModel.findById(docID, "-password").populate(
      "rosterArray"
    );
    res.status(200).json({ docSchedule });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/availCenters/:date", async (req, res) => {
  let date = parseInt(req.params.date);
  let dateFuture = date + day * 31;
  let outputArray = {};

  //db.domain.find( {tag : {$exists:true}, $where:'this.tag.length>3'} )

  try {
    for (let i = date; i < dateFuture; i += day) {
      let rosterArray = await RosterModel.find({
        date: i,
        doctorID: { $ne: null },
      })
        .populate("apptArray")
        .exec();

      if (Object.keys(rosterArray).length > 0) {
        function groupBy(objectArray, property) {
          return objectArray.reduce(function (acc, obj) {
            let key = obj[property];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        }

        let groupByCenter = groupBy(rosterArray, "centerName");
        outputArray[i] = groupByCenter;
      }
    }

    res.status(200).json({ outputArray });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/bookAppt", async (req, res) => {

  let patientID = req.body.userID;
  let rosterID1 = req.body.rosterID1;
  let rosterID2 = req.body.rosterID2;
  let time1 = req.body.time1;
  let time2 = req.body.time2;

  let apptOneObj = {
    date: req.body.date1,
    time: time1,
    rosterID: rosterID1,
    patientID: patientID,
  };

  let apptTwoObj = {
    date: req.body.date2,
    time: time2,
    rosterID: rosterID2,
    patientID: patientID,
  };

  try {
    let appt1 = new appointmentModel(apptOneObj);
    appt1.save();
    let appt2 = new appointmentModel(apptTwoObj);
    appt2.save();

    await RosterModel.findByIdAndUpdate(rosterID1, {
      $push: { apptArray: appt1._id },
    });
    await RosterModel.findByIdAndUpdate(rosterID2, {
      $push: { apptArray: appt2._id },
    });
    await UserModel.findByIdAndUpdate(patientID, {
      $set: {
        firstShotApptID: appt1._id,
        secondShotApptID: appt2._id,
      },
    }); 

    res.status(200).json({ message: "appt saved" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

// router.get("",async(req,res)=>{
//     try{
//         res.status(200).json({})
//     }catch(e){
//         res.status(500).json({ message: "something went wrong"})
//     }
// })

module.exports = router;
