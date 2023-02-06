const express = require("express")
require("dotenv").config()
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const { Usermodel } = require("../models/userModel")



router.get("/", (req, res) => {
    res.send("Api working fine")
})



router.post("/signup", (req, res) => {
    const { name, email, password, role } = req.body
    try {
        bcrypt.hash(password, +process.env.saltround, async (err, hash) => {
            
            if (err) {
                console.log({"message":err.message});
            } else {
                
                let data = new Usermodel({
                    name,
                    email,
                    password: hash,
                    role
                })
            
                await data.save()
                res.send({"message":"User Registered Sucessfull"})

            
            }


        })
    } catch (error) {
        res.send({"message":error.message})
    }


})



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let data = await Usermodel.findOne({ email })
    
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            
            if (result) {
                
                let token = jwt.sign({ a: "b", "role": data.role }, process.env.key, { expiresIn: 60 });
                let refresh_token = jwt.sign(
                    {
                        a: "b",
                        role: data.role
                    },
                  process.env.refresh_key,
                  { expiresIn: 300 }
                );
            
            
            
                res.cookie( "Token", token )
                res.cookie( "Refresh_Token", refresh_token )
                
                    res.send({"message":"Login Sucessfull"})
            
            } else {
                res.send({"message":"Login Again"})
            }



        })
    } else {
        res.send({"message":"Login Again"})
    }

})


router.get("/logout", (req, res) => {
    try {

        let token = req.cookies.Token
        // console.log(token)
        let data = JSON.parse(fs.readFileSync("./blacklist.json"))
        data.push(token)
        fs.writeFileSync("./blacklist.json", JSON.stringify(data), "utf-8")
        res.send({"message":"Logout Sucessfull"})

    } catch (error) {
        console.log({ "message": error.message });
        res.send({"message":error.message})
    }
})


router.get("/getnewtoken", (req, res) => {
    const refresh_token = req.cookies.Refresh_Token

    if (!refresh_token) {
        res.send({"message":"Please Login Again"})
    } else {
        jwt.verify(refresh_token, process.env.refresh_key, (err, decoded) => {
            if (err) {
                res.send({"message":"please login again", "err":err.message})
            } else {
                const token = jwt.sign({ a: "b" }, process.env.key, { expiresIn: 60 })
                res.send({"message":"Login Sucessfull", token})
            }
        })
    }

})


module.exports = {router}