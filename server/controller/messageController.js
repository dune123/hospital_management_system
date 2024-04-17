const Message = require("../models/messageModel");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const ErrorHandler=require("../middleware/errorMiddleware.js")

const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please fille the form",400))
    }
    
    try {
        await Message.create({ firstName, lastName, email, phone, message });

        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while sending the message"
        });
    }
});

const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const message=await Message.find();
    res.status(200).json({
        success:true,
        message
    })
})


module.exports = {
    sendMessage,
    getAllMessages
};
