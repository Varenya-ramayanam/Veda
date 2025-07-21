const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/authMiddleware");
const { getUsers,createUser,updateUser,deleteUser } = require("../controllers/adminController");

// @route GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get("/users", protect, admin, getUsers);

// @route POST /api/admin/users
// @desc    Create a new user
// @access  Private/Admin
router.post("/users", protect, admin, createUser);

// @route PUT /api/admin/users/:id
// @desc    Update a user
// @access  Private/Admin
router.put("/users/:id", protect, admin, updateUser);

// @route DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete("/users/:id", protect, admin, deleteUser);


module.exports = router;