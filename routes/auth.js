const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//  @route       GET api/auth
//  @desc        Get logged in user
//  @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//  @route       POST api/auth
//  @desc        Auth and get Token
//  @access      Public
router.post(
  '/',
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({
        $or: [{ email: username }, { username: username }],
      });

      if (!user) {
        return res.status(400).json([{ msg: 'Invalid Credentials' }]);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json([{ msg: 'Invalid Credentials' }]);
      }

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

module.exports = router;
