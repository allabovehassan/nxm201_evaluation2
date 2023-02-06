const express = require("express");

const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const authenticator = (req, res, next) => {
  let token = req.cookies.Token;
    console.log(token)
    try {
      
        let data = JSON.parse(fs.readFileSync("./blacklist.json"));
        
        if (data.includes(token)) {
        
            res.send({ message: "Login Again" });
            
        } else {
            
            jwt.verify(token, process.env.key, (err, decoded) => {
          
                if (err) {
            
                    console.log({ message: "Login Again" });
                    
                } else {
                    
                    jwt.verify(token, process.env.key, (err, decoded) => {
              
                        if (err) {
                
                            console.log({ message: "Login Again" });
                            
                            res.send({ message: "Login Again" });
                            
                        } else {
                            
                            let role = decoded.role;
                            
                            req.body.role = role;
                            
                            next();
                            
            }
          });
        }
      });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = { authenticator };
