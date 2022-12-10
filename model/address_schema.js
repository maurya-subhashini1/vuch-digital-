const mongoose=require("mongoose");
const validator=require("validator")
mongoose.set('strictQuery', true);

require('dotenv')

const uri = "mongodb://0.0.0.0:27017/vouchCompny";
mongoose.connect(uri)
.then(()=>{
    console.log('connection');
}).catch((err)=>{
    console.log(err);
})
const menSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('invalid email')
            }
        }
    },
   
})

//we are creating a new collection

const contactDetails=new mongoose.model("contacts",menSchema)

module.exports=contactDetails