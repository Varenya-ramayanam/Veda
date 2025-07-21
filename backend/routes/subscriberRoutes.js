const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");


// @route POST /api/subscribers
// @desc    Subscribe to newsletter
// @access  Public
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newSubscriber = new Subscriber({ email });

        await newSubscriber.save();

        res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;