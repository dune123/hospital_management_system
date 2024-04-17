const {Router}=require('express')
const {sendMessage, getAllMessages}=require('../controller/messageController')
const {isAdminAuthenticated}=require("../middleware/Auth.js")
const router=Router()

router.post("/api/v1/message/send",sendMessage)
router.get("/api/v1/message/get",isAdminAuthenticated,getAllMessages)

module.exports=router