const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const userRouter = express.Router();
const saltRounds = 10;

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
            var token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
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

module.exports = userRouter;
