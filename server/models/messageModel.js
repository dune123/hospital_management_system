const {mongoose} = require('mongoose')

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must At least 3 charecter"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must At least 3 charecter"]
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"phone no must contain 10 digits only"],
        maxLength:[10,"phone no must contain 10 digits only"]
    },
    message:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Message",messageSchema)