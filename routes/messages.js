const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Message = require('../models/Message');

//  @route       GET api/messages
//  @desc        Get user messages
//  @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(messages);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//  @route       GET api/messages/fav
//  @desc        Get user favourite messages
//  @access      Private
router.get('/fav', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      user: req.user.id,
      is_fav: true,
    }).sort({
      date: -1,
    });
    res.json(messages);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//  @route       POST api/messages
//  @desc        Send message
//  @access      Public
router.post(
  '/',
  [
    check('user_id', 'UserId is required').not().isEmpty(),
    check('content', 'Message content is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { user_id, content, sender } = req.body;

      let user = await User.find({ _id: user_id });

      if (!user || !user.length) {
        return res.status(404).json([{ msg: 'User not exists' }]);
      }

      const newMessage = new Message({
        user: user_id,
        content,
        sender,
      });

      const message = await newMessage.save();
      res.json(message);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//  @route       PUT api/messages/fav/:id
//  @desc        Add/Remove message to/from favourite
//  @access      Private
router.put('/fav/:id', auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) return res.status(404).json([{ msg: 'Message not found' }]);

    // Make sure user owns message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json([{ msg: 'Not authorized' }]);
    }

    message = await Message.findByIdAndUpdate(
      req.params.id,
      { is_fav: !message.is_fav },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//  @route       DELETE api/messages/:id
//  @desc        Delete message
//  @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) return res.status(404).json([{ msg: 'Message not found' }]);

    // Make sure user owns message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json([{ msg: 'Not authorized' }]);
    }

    await Message.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Message removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
