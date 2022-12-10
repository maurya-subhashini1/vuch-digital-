const cookiesParser = require("cookie-parser")
const express=require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
router.use(cookiesParser())


authentication=(req,res,next)=>{
    token=req.cookies;
    console.log(token);
    if (token==undefined){
        res.send({succses:0,
        message:"authentication error"})
    }else{
    jwt.verify(token.user,"vouchDigtal",(err,tokendata)=>{
        if(err){
            res.send({message:"authentication  error12"});
            console.log(err)

        }
        else{
            res.tokendata=tokendata
            next()
        }

    })}

}
module.exports={authentication}