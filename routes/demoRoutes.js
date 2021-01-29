const express = require('express');
const router = express.Router();

const Demo = require('../models/demoModel');

//Create User
router.post('/', async (req, res) => {
    const createdUser = await Demo.create(req.body);
    const user = await Demo.findById(createdUser._id).select('-password');
    res.json(user);
});

// UserLogin
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email);
    if (user && (await user.comparePassword(password))) {
        const userProfile = await User.findById(user.id).select('-password');
        console.log(userProfile);
        res.json(userProfile);
    } else {
        res.json({ msg: 'Username or Password is incorrect' });
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    const user = await Demo.findById(req.params.id);
    res.json(user);
});

module.exports = router;
