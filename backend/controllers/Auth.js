const user = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({msg: "All fields are required"});
        }
        const existingUser = await user.findOne({ email });
        if(existingUser) {
            return res.status(400).json({msg: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new user({
        username,
        email,
        password: hashedPassword
        });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(400).json({msg: "User does not exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({msg: "Invalid credentials"});
        }
        res.status(200).json(existingUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

