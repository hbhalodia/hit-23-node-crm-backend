const express = require('express')
const mongoose = require('mongoose')
const exApp = express()
const stdRoute = require('./routes/studentt')
const authRoute = require('./routes/auth')


exApp.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization "
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})


const uri = 'mongodb+srv://MongoDBUser:XgRfI5GrCqEiTxWa@mean-cluster-kgx99.mongodb.net/MongoDBUser?retryWrites=true&w=majority'
//mongoose.connect(uri)


mongoose
 .connect(
   uri
 )
 .then(() => {
   console.log("Connected To databse ..")
 })
 .catch(() => {
  console.log("Connection Failed ..")
 });
 


exApp.use('/api', stdRoute);
exApp.use('/auth', authRoute)

module.exports = exApp