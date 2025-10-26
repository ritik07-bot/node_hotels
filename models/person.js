const mongoose = require('mongoose');
const Passport = require('passport');

const bcrypt = require('bcrypt');


//Define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save',async function(next){
    const person=this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        //hash password generate
        const salt =await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //override the plain password with the hashed password
        person.password=hashedPassword;


        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword= async function(candidatePasssword){
    try{
        //use bcrypt to compare the provided password with teh hashed password
        const isMatch=await bcrypt.compare(candidatePasssword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
//prince --->jhfgaffgvnvfuvervuiv
//login-->ritik

//0fhuirgvbbv
//salt + ritik --> hash--> wefglferbevv
// dont match

// Create a person model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
