const jwt= require("jsonwebtoken")


const  contactDetails=require("../model/address_schema")

// Add a new contact.


const AddNewContact=(req,res)=>{
        let user=new contactDetails  ({
            name:req.body.name,
            lastName:req.body.lastName,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            
        })
        user.save()
        .then(user =>{
            res.json({
                message:"add new contact successfuly..",
                user:user
            })
        }).catch(error =>{
            res.json({
                message:"An error occured!",
                error:error
            })
            console.log(error);
        })
}



// for authentication api using jwt

const GetUserWithJWT=(req,res)=>{
    var name=req.body.name
    contactDetails.find({name:name})

    .then(contactDetail =>{
        let token=jwt.sign({id:contactDetail.id}, 'vouchDigtal' ,{expiresIn:"8h"})
        res.cookie("user",token)

        res.json({
            message:"You are autnetication successfully..",
            token
        })
        // }
    })
}



// Update the given contact.

const update_UderDetailes=(req,res)=>{
       
            const id=req.params.id
            const result =contactDetails.findByIdAndUpdate(id,{
                $set:{
                    name:req.body.name,
                    lastName:req.body.lastName,
                    address:req.body.address,
                    Phone_No:req.body.Phone_No,
                    email:req.body.email,
                } 
            })
            // res.send(result)
            .then((result)=>{
                res.send({message:"updated successfuly...",result:result

                })

            }).catch((err)=>{
                res.send(err)
            })
        
    }



// delete the given contact.

const DeleteContact=async(req,res)=>{
    try{
        const id=contactDetails.id
        const result=await contactDetails.deleteOne(id)
        console.log(result);
        res.send({message:"delete data successfuly..:",result:result})
    }catch(err){
        console.log(err);
    }
}



// Fetch details of single contact.

const FetchDetailsOfSingleConact=async(req,res)=>{
    try{
        const id=contactDetails.id
        res.send(await contactDetails.find(id))
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
}

  

// Fetch the list of contacts with pagination.


const FetchListOfContact =(async (req, res, next) => {
    const { page = 1, limit = 20 } = req.query;
    const FetchList = await contactDetails
      .find({})
      .limit(limit * 1)
      .skip((page - 1) * limit);
      
  if (FetchList.length === 0) {
    return next(new ErrorHandler("Data not found!", 404));
  }
  res.json({
    status: 200,
    success: true,
    message: "Get FetchListOfContact Successfully!",
    FetchListOfContact: FetchList,
  });
});





// Fetch phase matching results.

const Fetch_matching =(async (req, res, next) => {
    const resultes = await contactDetails
      .find({ Phone_No: req.query.Phone_No })
    if (resultes.length === 0) {
      res.send("Data not found!");
    }
    res.json({
      status: 200,
      success: true,
      message: "Get data Successfully!",
      Fetch_matching: resultes,
    });
  });
  

module.exports={AddNewContact,GetUserWithJWT,update_UderDetailes ,DeleteContact ,FetchDetailsOfSingleConact,FetchListOfContact ,Fetch_matching}