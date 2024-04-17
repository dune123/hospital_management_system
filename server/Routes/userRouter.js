const {Router}=require('express')
const {adminLogout,patientRegister,login,addNewAdmin, getalldoctor, getUserDetails, patientLogout,addNewDoctor}=require('../controller/userController')
const {isAdminAuthenticated,isPatientAuthenticated}=require("../middleware/Auth.js")
const router=Router()

router.post("/api/v1/user/register",patientRegister)
router.post("/api/v1/user/login",login)
router.post("/api/v1/admin/newadmin",isAdminAuthenticated,addNewAdmin)
router.get("/api/v1/doctors",getalldoctor)
router.get("/api/v1/user/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/api/v1/user/patient/me",isPatientAuthenticated,getUserDetails)
router.get("/api/v1/user/admin/logout", isAdminAuthenticated, adminLogout)
router.get("/api/v1/user/patient/logout", isPatientAuthenticated,patientLogout)
router.post("/api/v1/user/doctor/addnew",isAdminAuthenticated,addNewDoctor)

module.exports=router

