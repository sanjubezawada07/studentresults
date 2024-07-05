const express=require('express');
const mongoose=require('mongoose');
const {MongoClient}=require('mongodb');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const uri = 'mongodb+srv://21bq1a0518:fY6ISRgWbMmTytzw@studentdatabase.r8var6s.mongodb.net/';
mongoose.connect('mongodb+srv://21bq1a0518:sanjana@studentdatabase.r8var6s.mongodb.net/studentDb');
const conn=mongoose.connection;
conn.once('open',()=>{
    console.log("connected to database succesfully");
})
conn.on('error',()=>{
    console.log("err occured while connecting");
})
const studentSchema=new mongoose.Schema({
    student_Id:String,
    Name:String,
    Physics:String,
    Chemistry:String,
    Maths:String,
    Grade:String,
})
const resultsdemo=conn.model('resultsdemo',studentSchema);
var number="";
app.post('/student_data',(req,res)=>{
    number=req.body.num;
});
app.get('/post',(req,res)=>{
        resultsdemo.find({student_Id:number})
        .then((result)=>{
        res.json(result);
        console.log(result);
    })
    .catch((err)=>console.log(err));
    })
app.listen(8000,()=>{
    console.log("running on port 8000");
})
