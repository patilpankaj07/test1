
const express = require('express');
const { connect } = require('./model/db');

const Routes=require("./routes.js");
const cors = require('cors');

const app=express();

const PORT=5000;


const corsOption={
    origin: 'http://localhost:5173',
};

app.use(express.json());
app.use(cors(corsOption))


app.use('/',Routes)


connect();
app.listen(PORT,()=>{
    console.log(`Listen on Port: ${PORT}`);
})