const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const {
  ErrorHandler,
  errorMiddleware,
} = require("../middleware/errorMiddleware.js");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/jwtCookies.js");

const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(new ErrorHandler("User Already Register", 400));
  }
  const user=await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  })
  generateToken(user, "User Register successfully", 200, res);
});

const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Provide all details", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password Or email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  generateToken(user, "User Login suceessfully", 200, res);
});

const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(
      new ErrorHandler(`${isRegister.role} with this email already exits`)
    );
  }
  const admin = await User.create({
    firstname,
    lastname,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
  });
});

const getalldoctor = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });

  res.status(200).json({
    success: true,
    doctors,
  });
});

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

const adminLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logout successfully",
    });
});

const patientLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logout successfully",
    });
});

const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    const {firstname,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment}=req.body;
    if(!firstname||
        !lastname||
        !email||
        !phone||
        !password||
        !gender||
        !dob||
        !nic||
        !doctorDepartment){
            return next(new ErrorHandler("please provide full details"))
        }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`,400))
    }

    const doctor=User.create({
        firstname,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role:"Doctor",
    })
    res.status(200).json({
        success:true,
        message:"New Doctor Registered!",
    })
})

module.exports = {
  patientRegister,
  login,
  addNewAdmin,
  getalldoctor,
  getUserDetails,
  adminLogout,
  patientLogout,
  addNewDoctor,
};
