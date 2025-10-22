const mongoose=require("mongoose");

//Define the mongoDB connection URL
const mongoURl = 'mongodb://127.0.0.1:27017/hotels'//Replace 'mydatabase' with your database name

//Setup MongoDB connection
mongoose.connect(mongoURl,{
     useNewUrlParser: true,
    useUnifiedTopology: true
 
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDb connection 
const db= mongoose.connection;

//Define event Listeners for databases connections 

db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(error)=>{
    console.log('MongoDb connection error',error);
});

db.on('disconnected',()=>{
    console.log('Disconnected to mongodb server');
});

module.exports=db;
