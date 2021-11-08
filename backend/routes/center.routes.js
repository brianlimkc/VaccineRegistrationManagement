const router = require("express").Router();
const CenterModel = require("../models/center.model");
const checkUser = require("../lib/check");
const { nanoid } = require("nanoid");

router.get("/showall", checkUser, async (req, res) => {
  try {
    let centerArray = await CenterModel.find();
    res.status(200).json({ centerArray });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/show/:id", checkUser, async (req, res) => {
  let centerID = req.params.id;

  try {
    let center = await CenterModel.findById(centerID);
    res.status(200).json({ center });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post("/create", checkUser, async (req, res) => {
  try {
    let center = new CenterModel(req.body);
    let newNanoId = nanoid(8).toUpperCase();
    center.id = `C-${newNanoId}`;
    center.roomArray = [];
    await center.save();
    res.status(201).json({ center });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.post("/update", async (req, res) => {
  try {
    let updateObj = req.body;
    let id = req.body._id;
    let center = await CenterModel.findByIdAndUpdate(id, {
      $set: { ...updateObj },
    });
    res.status(200).json({ message: "center updated" });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

router.delete("/delete/:centerID", async (req, res) => {
  let centerID = req.params.centerID;
  try {
    let deleteObj = await CenterModel.findByIdAndDelete(centerID);
    res.status(200).json({ message: "center deleted" });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

module.exports = router;
