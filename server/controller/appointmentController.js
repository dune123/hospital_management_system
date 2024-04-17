const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const {
  ErrorHandler,
} = require("../middleware/errorMiddleware.js");
const Appointment = require("../models/appointmentModel.js");
const User = require("../models/UserModel.js");

const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctorfirstName,
      doctorlastName,
      hasVisited,
      address,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctorfirstName ||
      !doctorlastName ||
      !address
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    /*const isConflict = await User.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });*/
    const isConflict=await User.find({
        firstname:doctorfirstName,
        lastname:doctorlastName,
        role:"Doctor",
        doctorDepartment:department
    })
    if (isConflict.length === 0) {
      return next(new ErrorHandler("Doctor not found", 404));
    }
  
    if (isConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Doctors Conflict! Please Contact Through Email Or Phone!",
          400
        )
      );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctorfirstName,
        lastName: doctorlastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });
    res.status(200).json({
      success: true,
      appointment,
      message: "Appointment Send!",
    });
  });

const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments=await Appointment.find()
    res.status(200).json({
        success:true,
        appointments
    })
})

const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
  const {id}=req.params;
  let appointment=await Appointment.findById(id);
  if(!appointment){
    return next(new ErrorHandler("Appointment not found!",404))
  }
  appointment=await Appointment.findByIdAndUpdate(id,req.body,{
    new:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true,
    message:"Appointment Status Updated!"
  })
})

const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
  const {id}=req.params;
  const appointment=await Appointment.findById(id);
  if(!appointment){
    return next(new ErrorHandler("Appointment Not Found"))
  }
  await appointment.deleteOne();
  res.status(200).json({
    success:true,
    message:"Appointment Deleted!"
  })
})

module.exports = {
    postAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
}