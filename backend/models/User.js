const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String }, // Add contact number field
    address: {
        doorNumber: { type: String },
        streetName: { type: String },
        city: { type: String },
        country: { type: String },
        pincode: { type: String }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
