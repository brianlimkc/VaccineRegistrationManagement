const router = require('express').Router()
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const checkUser = require("../lib/check")
const { nanoid } = require('nanoid')
const saltrounds = 10;


router.get('/getAll', async(req,res) => {
    try{
        let userArray = await UserModel.find()    
        let doctorArray = []
        let patientArray = []
        userArray.forEach(user=>{

            if (user.isStaff) {
                doctorArray.push(user)
            } else {
                patientArray.push(user)
            }
        }) 

        
        res.status(200).json({userArray,doctorArray,patientArray})
    }catch(e){
        res.status(500).json({ message: "something went wrong"})
    }
})

router.get('/user', checkUser, async(req, res) => {


    try{
        let user = await UserModel.findById(req.user.id, "-password")
                                                .populate("firstShotApptID")
                                                .populate("secondShotApptID") 
                                                .populate("rosterArray")  
                                                
                                                
        if (user.nric) {
            user.nric = user.nric.substring(0,1) + "XXXX" + user.nric.substring(5,9)
        }
        res.status(200).json({user})
    }catch(e){
        res.status(500).json({ message: "something went wrong"})
    }
})

router.get('/getUser/:id', async(req, res) => {

    let userID = req.params.id  

    try{
        let user = await UserModel.findById(userID, "-password").populate("rosterArray")        
        res.status(200).json({user})
    }catch(e){
        res.status(500).json({ message: "something went wrong"})
    }
})



//
router.post('/register', async (req, res) => {
    try {
            let emailSearch = await UserModel.findOne({email: req.body.email});
            if (emailSearch) {
                res.status(400).json({message: "Duplicate email. Please use another email."});
            } else {            
                              
                let user = new UserModel(req.body)
                user.password = await bcrypt.hash(user.password,saltrounds)
                let newNanoId = await nanoid(8).toUpperCase()
                user.id = `${(user.isStaff) ? "S-" : "U-"}${newNanoId}`
                await user.save()                                

                //
                let token = jwt.sign({
                    user: {
                        id: user.id,
                        isStaff: user.isStaff,
                        isAdmin: user.isAdmin
                    }
                }, process.env.JWTSECRET, {expiresIn: "7d"})

                res.status(201).json({user, token})
            }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "user not created"})
    }
})
//
router.post('/login', async(req, res) => {
    try{
        let user = await UserModel.findOne({email: req.body.email}).populate("rosterArray")
                                                // .populate("firstShotApptID")
                                                // .populate("secondShotApptID")
        //if user is empty
        if(!user){
            throw "user not found"
        }
        //if password is not a match
        if(!user.validPassword(req.body.passwordLogin)){
            throw "check user password"
        }

        //sign the token
        //process.env.JWTSECRET

        let token = jwt.sign({user : {
                id: user._id,
                isStaff: user.isStaff,
                isAdmin: user.isAdmin
            }},process.env.JWTSECRET,{expiresIn: "7d" })

        res.status(200).json({user, token})
    }catch (e){
        console.log(e)
        res.status(400).json({message: e})
    }

})

router.post('/update', checkUser, async (req, res) => {
    try {
        let updateObj = req.body
        let id = req.user.id

        if (updateObj.password === "" || updateObj.password === undefined) {
            delete updateObj.password
        } else {
            updateObj.password = await bcrypt.hash(updateObj.password,saltrounds)
        }
        
        let user = await UserModel.findByIdAndUpdate(id, {$set: {...updateObj}})
        res.status(200).json({user})
        } catch (e)
        {
        console.log(e)
            res.status(400).json({message: e})
        }
})

router.post('/updateUser/:id', async (req, res) => {
    let userID = req.params.id 

    try {
        let updateObj = req.body
        await (updateObj.password) ? updateObj.password = await bcrypt.hash(updateObj.password, 10) :

        await UserModel.findByIdAndUpdate(userID, {$set: {...updateObj}})
        res.status(200).json({message: "user updated"})
        } catch (e)
        {
        console.log(e)
            res.status(400).json({message: e})
        }
})


router.delete('/delete', checkUser, async (req, res) => {
    try {
            let deleteObj = await UserModel.findByIdAndDelete(req.user.id)
            res.status(200).json({message: "user deleted"})
        } catch (e)
        {
        console.log(e)
            res.status(400).json({message: e})
        }
})

router.delete('/delete/:id', checkUser, async (req, res) => {

    let userID = req.params.id 

    try {
            let deleteObj = await UserModel.findByIdAndDelete(userID)
            res.status(200).json({message: "user deleted"})
        } catch (e)
        {
        console.log(e)
            res.status(400).json({message: e})
        }
})


module.exports = router
