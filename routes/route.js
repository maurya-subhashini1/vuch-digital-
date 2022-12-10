const express=require("express")

const router=express.Router()

const {AddNewContact, GetUserWithJWT, update_UderDetailes, DeleteContact, FetchDetailsOfSingleConact, FetchListOfContact, Fetch_matching}=require("../controler/address")
const { authentication } = require("../Middleware/auth")
router.post("/api/AddNewContact",AddNewContact)
router.post("/authentoication",GetUserWithJWT)
router.put("/update/:id",authentication,update_UderDetailes)

router.delete("/delete/contact/:id",authentication,DeleteContact)
router.get("/get/single/conact/:id",authentication,FetchDetailsOfSingleConact)  
router.get("/get/contact/with/pagination",authentication,FetchListOfContact)
router.get("/fetch/matching/resultes",authentication,Fetch_matching)


module.exports=router

// /*  */