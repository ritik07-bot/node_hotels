const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data2 = req.body;

    const newItem = new MenuItem(data2);

    const response = await newItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data2 = await MenuItem.find();
    console.log("data item fetched");
    res.status(200).json(data2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});
router.get("/:tastey", async (req, res) => {
  try {
    const tastey = req.params.tastey; 

    if (tastey == "sweet" || tastey == "sour" || tastey == "spicy") {
      const response = await MenuItem.find({ taste: tastey });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//comment added
module.exports=router;
