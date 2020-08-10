const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//  @route       POST api/users
//  @desc        Register a user
//  @access      Public
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be more than 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });

      if (user) {
        return res
          .status(400)
          .json([{ msg: 'Username or Email already exists' }]);
      }

      user = new User({ username, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600 * 1000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//  @route       PUT api/users/
//  @desc        Update a user
//  @access      Private
router.put('/', auth, async (req, res) => {
  const { allow_messages, name, bio, gender } = req.body;

  // New user object
  const new_user = {};

  if (allow_messages !== null) new_user.allow_messages = allow_messages;
  if (name !== null) new_user.name = name;
  if (bio !== null) new_user.bio = bio;
  if (gender) new_user.gender = gender;

  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json([{ msg: 'User not found' }]);

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: new_user },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//  @route       PUT api/users/password
//  @desc        Update user password
//  @access      Private
router.put(
  '/password',
  [
    auth,
    [
      check('old_password', 'Old assword is required').exists(),
      check('new_password', 'Password must be more than 6 characters').isLength(
        {
          min: 6,
        }
      ),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { old_password, new_password } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) return res.status(404).json([{ msg: 'User not found' }]);

      const isMatch = await bcrypt.compare(old_password, user.password);

      if (!isMatch) {
        return res.status(400).json([{ msg: 'Old password is incorrect' }]);
      }

      // New user object
      const new_user = {};
      const salt = await bcrypt.genSalt(10);
      new_user.password = await bcrypt.hash(new_password, salt);

      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: new_user },
        { new: true }
      ).select('-password');

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//  @route       GET api/users/:username
//  @desc        Get user by username
//  @access      Public
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      '-password -email -date -__v'
    );

    if (!user) return res.status(404).json([{ msg: 'User not found' }]);

    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
