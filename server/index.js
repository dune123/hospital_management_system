const express = require('express');
const cors=require('cors')
const bodyParser = require("body-parser")
const {mongoose}=require('mongoose')
const {errorMiddleware}=require("./middleware/errorMiddleware")
const messageRoutes=require("./Routes/messageRoutes")
const userRouter=require("./Routes/userRouter")
const appointmentRouter=require("./Routes/appointmentRouter")
const cookieParser = require('cookie-parser');
require('dotenv').config()

const PORT=process.env.PORT||5000
const app=express()

app.use(express.json())
app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 ,
        writeConcern: { w: 'majority' }// Timeout in milliseconds
    })
    .then(() => console.log(`Connected to MongoDB`))
    .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`));

app.use(messageRoutes)
app.use(userRouter)
app.use(appointmentRouter)
app.use(errorMiddleware)
app.listen(PORT,()=>console.log(`serverlistening on ${PORT}`))

