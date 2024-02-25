const mongoose = require('mongoose');

// Defines the user schema for authentication and preference updation
let Schema = mongoose.Schema;
let userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "userName not provided "],
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }

    },
    password: {
        type: String,
        required: true
    },
    q: {
        type: String,
        required: false
    },
    domains: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);