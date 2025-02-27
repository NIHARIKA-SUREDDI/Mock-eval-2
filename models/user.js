const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: {type:String},
   email: {type:String, Unique:true},
   password: {type:String},
   mobileNumber: {type:String},
  gender: {type:String},
  role: {type:String,enum:["admin","user"]}


});
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;