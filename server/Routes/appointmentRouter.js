const express=require("express")
const {postAppointment,getAllAppointments, updateAppointmentStatus, deleteAppointment}=require("../controller/appointmentController.js")
const {isAdminAuthenticated,isPatientAuthenticated}=require("../middleware/Auth.js")

const router=express.Router();

router.post("/api/v1/appointment/post",isPatientAuthenticated,postAppointment)
router.get("/api/v1/appointment/getall",isAdminAuthenticated,getAllAppointments);
router.put("/api/v1/appointment/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/api/v1/appointment/delete/:id",isAdminAuthenticated,deleteAppointment)

module.exports=router 