const { default: mongoose } = require("mongoose")
const momgoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },

    email: {
        type: String,
        required: [true, "Email ID already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add the user Password"]
    },
},
{
    timestamp: true,
});

module.exports = mongoose.model("User", userSchema);