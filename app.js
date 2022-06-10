const express=require('express');

const mongoose=require('mongoose');

const cors=require("cors");

const app=express();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());

const Port=process.env.PORT || 7200

const userRouter=require('./routes/userRoutes');

const customerRouter=require('./routes/customerRoutes');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
 
app.use('/user',userRouter);

app.use('/customer',customerRouter);

mongoose.connect('mongodb+srv://TSM123:uTfXYXKjnYBVPO0x@cluster0.kzcr0.mongodb.net/TSM?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
},
mongoose.set('useFindAndModify', false),
mongoose.set('useCreateIndex', true)
).then(()=>{
    console.log('Db connected........');
    
}).catch((err)=>{
    console.log('Not able to connect DB' +  ' '+err);
    
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static("Shockmechanica/dist"));
    const path=require("path");
        app.get("*",(req,res)=>{
            res.json("server started")
            res.sendFile(path.resolve("server","Shockmechanica","dist","index.html"));
        })
}

app.listen(Port,()=>{
    console.log('server started.... @ localhost://7200');
    
})