const express = require("express");
const router = express.Router();

const Person = require("./../models/person");


//POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //create a new Person document using the Mongoose Model
    const newPerson = new Person(data);

    //save the new person to the databse
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal Server Error" });
  }
});

//Get method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
})


router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // correct syntax

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id",async(req,res)=>{
    try{

        const personId= req.params.id;//Extract the id from url paarameter
        const updatePersonData= req.body;//Run Mongoose validataion

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,//Return the update document
            runValidators:true,//run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error:"result not found"});
        }

        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

router.delete("/:id",async(req,res)=>{
    try{

        const personId= req.params.id;//Extract the id from url paarameter

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"result not found"});
        }

        console.log("data deleted");
        res.status(200).json({message:"person deleted successfullty"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

module.exports=router;