const crypto = require('crypto')
const { uuid } = require('uuidv4');
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{ type: String, required: true,maxlength: 32,trim: true } ,
    encPassword:{ type: String, required: true,maxlength: 200},
    salt:{ type: String, required: true,maxlength: 100},
    createdTs:{ type: Date, default: Date.now }   
});


userSchema.methods.setPassword = function(plaingTextpassword){
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.encPassword =  crypto.pbkdf2Sync(plaingTextpassword, this.salt,1000, 64, `sha512`).toString(`hex`);
}

userSchema.methods.validatePassword = function(plaingTextpassword) {
    const passwordHash =  crypto.pbkdf2Sync(plaingTextpassword, this.salt,1000, 64, `sha512`).toString(`hex`);
    return (passwordHash === this.encPassword);
}


module.exports = mongoose.model("users", userSchema);