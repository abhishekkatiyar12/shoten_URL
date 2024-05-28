const express =require('express');
const {connectToMongoDb}= require('./connect');
const urlRoute=require('./routes/url');
const URL=require('./models/url');
const app=express();

const port=8001;



const url='mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.5mzncy3.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0'
const databaseUser='abhishekkatiyar';
const databasePassword='Abhishek123';
const databaseName='short-url';

let dbLink=url.replace("$_USERNAME_$",databaseUser);
dbLink=dbLink.replace("$_PASSWORD_$",databasePassword);
dbLink=dbLink.replace("$_DB_NAME_$",databaseName);

connectToMongoDb(dbLink).then(()=>console.log("connected"));

app.use(express.json());
app.use('/url',urlRoute);

app.listen(port,()=>{
    console.log(`server started at port : ${port}`);
})