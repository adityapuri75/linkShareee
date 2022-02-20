const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    imgUrl: String,
    title: String,
    description: String,
    links:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Link'
        }
    ]

});

const User = mongoose.model('User', UserSchema);

module.exports = User;