const asyncHandler = require("express-async-handler");
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ACCESS_TOKEN_SECRET = 'aryan123'

const registerUser = asyncHandler (async(req, res) => {
    const{username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All fileds are mandatory");
    }
    const userAvailable = await User.findOne({email}); //email:email 
    if (userAvailable) {
        res.status(400);
        throw new Error("User with this email already exists.")
    }
    const hashedPassword = await bcrypt.hash(password, 10) // Encryption of the password
    console.log("The hashed Password is: ", hashedPassword);
   
    const user = await User.create({
        username,
        email,
        password: hashedPassword, // syntax can also be {.., password, ..} but we want the hashed password to be saved hence we used password: hashedPassword
    })
    console.log(`User ${user} created succesfully`);
    if (user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error("User data not valid");
    }
    res.json({message : "Register the user"});
});

const loginUser = asyncHandler (async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
const user = await User.findOne({email});
if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign(
    {
        user:{
            username: user.username,
            email: user.email,
            id : user.id,
        },        
    }, ACCESS_TOKEN_SECRET, 
    { expiresIn: "15m"}
    );
res.status(200).json({ accessToken });

} else{
    res.status(401)
    throw new Error("Invalid Password or Username")
}
})
const currentUser = asyncHandler (async(req, res) => {
    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser}