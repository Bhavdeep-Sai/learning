const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const userData = require('../model/userSchema')

router.post('/add', async(req,res)=>{
    const {username, email, password, contact} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({msg:"Required all fields"});
    }else if(password.length < 7){
        return res.status(400).json({msg:"Required a Strong password"});
    }

    try {
        const existUser = await userData.findOne({email : email})
        if(existUser){
            return res.status(400).json({msg:"User already Exists"})
        }
        const hashedPass = bcrypt.hashSync(password, 10);

        const newUser = new userData({username, email, password: hashedPass, contact});
        await newUser.save();
        res.status(201).json({msg:"User added", data:newUser});
    } catch (error) {
        res.status(500).json({msg:"Internal server Error"})
    }
})


router.get('/', async(req,res)=>{
    try {
        const allUsers = await userData.find();
        if(!allUsers || allUsers.lenght==0){
            return res.status(404).json({msg:"User Data is empty"})
        }
        res.status(200).json({data:allUsers});
    } catch (error) {
        res.status(500).json({msg:"Internal server Error"})
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const user = await userData.findById(req.params.id);
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        res.status(200).json({msg:"User found", data:user});
    } catch (error) {
        res.status(500).json({msg:"Internal server Error"})
    }
})


router.put('/update/:id', async (req,res)=>{
    try {
        const updateUser = await userData.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json({msg:"User data Updated", data:updateUser});
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

router.delete('/delete/:id', async (req,res)=>{
    try {
        const deleteUser = await userData.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"User Deleted"});
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
})

module.exports = router;