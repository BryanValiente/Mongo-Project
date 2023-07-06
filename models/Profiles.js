const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        username: {type: String, default: ""},
        age: { type: Number, default: ""},
        song: { type: Object, default: ""},
    },
    {
        timestamps: {
            createdAt: "createdon",
            updatedAt: "updatedon",
        },
        toJSON: { virtuals: true },
        toObject: { virtuals: true},
    }
);

const ProfileModel = mongoose.model('profile-challenge', schema);

module.exports = ProfileModel;