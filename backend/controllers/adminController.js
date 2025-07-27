const User = require("../models/userModel");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a new user
// @route   POST /api/admin/users
// @access  Private/Admin
const createUser = async (req, res) => {
    let { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Normalize frontend role "customer" → schema role "user"
        if (role === "customer") role = "user";

        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update user details
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    let { name, email, password, role } = req.body;
    try {
        if (role === "customer") role = "user";

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ userId: req.params.id, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
