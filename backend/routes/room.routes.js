const router = require("express").Router();
const CenterModel = require("../models/center.model");
const RoomModel = require("../models/room.model");
const RosterModel = require("../models/roster.model");
const checkUser = require("../lib/check");
const { nanoid } = require("nanoid");

const day = 86400000;

router.get("/showall/:id", async (req, res) => {
  let centerID = req.params.id;
  try {
    let data = await CenterModel.findById(centerID).populate("roomArray");
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/show/:id", async (req, res) => {
  let roomID = req.params.id;

  try {
    let room = await RoomModel.findById(roomID).populate("centerID");
    res.status(200).json({ room });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  try {
    let room = new RoomModel(req.body);
    let centerID = req.body.centerID;
    let newNanoId = nanoid(8).toUpperCase();
    room.id = `R-${newNanoId}`;
    await room.save();
    await CenterModel.findByIdAndUpdate(centerID, {
      $push: { roomArray: room._id },
    });
    res.status(201).json({ room });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.post("/update/:id", async (req, res) => {
  let roomID = req.params.id;
  try {
    let updateObj = req.body;
    await RoomModel.findByIdAndUpdate(roomID, { $set: { ...updateObj } });
    let updatedRoom = await RoomModel.findById(roomID);

    res.status(202).json({ updatedRoom });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.delete("/delete/:roomID", async (req, res) => {
  let roomID = req.params.roomID;
  try {
    let roomObj = await RoomModel.findById(roomID);

    for (let i = 0; i < roomObj.rosterArray.length; i++) {
      await RosterModel.findByIdAndDelete(roomObj.rosterArray[i]);
    }

    await RoomModel.findByIdAndDelete(roomID);
    await CenterModel.findByIdAndUpdate(roomObj.centerID, {
      $pull: { roomArray: roomID },
    });

    res.status(200).json({ message: "room deleted" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
});

router.get("/rosterGet/:roomID", async (req, res) => {
  let roomID = req.params.roomID;
  try {
    let rosterArr = await RosterModel.find({ roomID: roomID }).populate(
      "doctorID"
    );

    res.status(200).json({ rosterArr });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/rosterPopulate/:roomID", async (req, res) => {
  let roomID = req.params.roomID;
  // let dateNow = new Date(new Date().toDateString());

  let dateTimeNow = Date.now();
  var timePortion = dateTimeNow % (3600 * 1000 * 24);
  var dateNow = dateTimeNow - timePortion;
  let dateFuture = dateNow + day * 31;

  try {
    let room = await RoomModel.findById(roomID).populate("rosterArray");

    let rosterDateArray = room.rosterArray.map((roster) => {
      return roster.date;
    });

    for (let i = dateNow; i < dateFuture; i += day) {
      if (!rosterDateArray.includes(i)) {
        roster = new RosterModel();
        roster.date = i;
        roster.centerID = room.centerID;
        roster.roomID = room._id;
        roster.roomName = room.name;
        roster.centerName = room.centerName;
        await roster.save();
        await RoomModel.findByIdAndUpdate(roomID, {
          $push: { rosterArray: roster._id },
        });
      }
    }

    res.status(200).json({ message: "roster updated" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
