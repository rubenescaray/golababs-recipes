const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // Simple validation
  if (!username || !password) {
    throw Error('Please enter name and password fields')
  }

  try {
    const user = await User.findOne({ username })
    if (!user) throw Error('User does not exist')

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials')

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token')

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  try {
    const user = await User.findOne({ email })
    if (user) throw Error('User already exists')

    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      username,
      email,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, `${process.env.JWT_SECRET_KEY}`, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router