const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    images: {
        type: String
    },
    bio: {
        type: String
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);