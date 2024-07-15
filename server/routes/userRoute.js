const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//Register a new user

router.post('/register', async (req, res) => {


    try {
        //check if the user is already registered

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,     
                message: 'User already exists',
            });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //save the user
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: " Registration successfully , Please log in"});
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//Login a user
router.post('/login',async (req, res) => {
    try{
        //check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User does not exist',
            });
        }

        //check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: 'Incorrect password',
            });
        }

        //create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret,{
            expiresIn: '1d'
        });

        res.send({
            success: true,
            message: "User logged in successfully",data:token});
    }
    catch(error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get user details by id

router.get('/get-current-user',authMiddleware, async (req, res)=>{
    try{
        const user = await User.findById(req.body.userId).select('-password')
        res.send({
            success:true,
            message:"User details fetched successfully",
            data:user
        });
    }
    catch(error){
        res.send({
            success:false,
            message:error.message
        })

    }
})

module.exports = router;