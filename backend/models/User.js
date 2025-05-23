const mongoose = require('mongoose');
const { Schema } =mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["user", "vendor"],
    },
    date:{
        type: Date,
        default: Date.now
    },
    is_verified:{
        type:String,
        default:'0'
    },
});

module.exports = mongoose.model('user', UserSchema);