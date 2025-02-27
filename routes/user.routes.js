const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const userRouter = express.Router();
const saltRounds = 10;
const nodemailer=require('nodemailer');

userRouter.post("/signup", async (req, res) => {
  try {
    let myplaintextpassword = req.body.password;
    bcrypt.hash(myplaintextpassword, saltRounds, async function (err, hash) {
      if (err) {
        res.status(500).json({ msg: "error in signup" });
      } else {
        let User = { ...req.body, password: hash };
        await userModel.create(User);
        res.status(201).json({ msg: "user created" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "error in signup" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      let myplaintextpassword = req.body.password;
      bcrypt.compare(myplaintextpassword, hash, function (err, result) {
        if (err) {
          res.status(500).json({ msg:"something went wrong" });
        } else {
          if (result) {
            var token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
            res.status(200).json({ msg: "login success", token });
          } else {
            res.status(403).json({ msg: "wrong password" });
          }
        }
      });
    }
    else{
        res.status(404).json({msg:"user not found,please signup"});
    }
  } catch (err) {
    res.status(500).json({ msg: "error in login" });
  }
});

userRouter.post('/booked',async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(!user){
        res.status(403).json({msg:"user not found"})
    }
    else{
        var token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'30min'})
        let linkToBeSent=`http://localhost:8080/user/booked/${token}`;
      const transporter=nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASSWORD,
        },
    }),
   await transporter.sendMail({
    from: '"niharika 👻" <niharika.sureddi@gmail.com>', 
    to: "venugopal.burli@masaischool.com,niharika.sureddi@gmail.com", 
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Ticket is confirmed please check</b><h3>${linkToBeSent}</h3>` ,// html body
 }),
  res.send("Emailsent,please check the email");
}
module.exports = userRouter;
