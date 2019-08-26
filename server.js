require('./models/db');
const express=require('express');
const bodyParser=require('body-parser');
const items=require('./routes/api/items');
const cors=require('cors');
const path= require('path');

const app=express();
app.use(cors());

//body parser middleware
app.use(bodyParser.json());

//routes
app.use('/api/items',items);

if(process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const port=process.env.PORT || 8080;

app.listen(port,()=>{
    console.log("server listening to port "+port);
})