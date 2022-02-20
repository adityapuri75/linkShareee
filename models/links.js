const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    linkname:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

});

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;