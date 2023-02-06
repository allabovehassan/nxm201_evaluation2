const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const authorise = (role_array) => {
    


    return (req, res, next) => {
        const role = req.body.role;
        if (role_array.includes(role)) {
            next()
        } else {
            res.send({"message":"u are not authorise"})
        }
    }
}

module.exports = {authorise}