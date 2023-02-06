const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name:String,
    email: String,
    password: String,
    role:String
}, {
    versionKey:false
})

const Usermodel = mongoose.model("RegisteredUser", userSchema)

module.exports = {Usermodel}