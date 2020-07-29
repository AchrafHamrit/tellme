const express = require('express');
const router = express.Router();

//  @route       GET api/messages
//  @desc        Get user messages
//  @access      Private
router.get('/', (req, res) => {
  res.send('Get messages');
});

//  @route       GET api/messages/fav
//  @desc        Get user favourite messages
//  @access      Private
router.get('/fav', (req, res) => {
  res.send('Get favourite messages');
});

//  @route       POST api/messages
//  @desc        Send message
//  @access      Public
router.post('/', (req, res) => {
  res.send('Send message');
});

//  @route       PUT api/messages/fav/:id
//  @desc        Add/Remove message to/from favourite
//  @access      Private
router.put('/fav/:id', (req, res) => {
  res.send('Add/Remove message to/from favourite');
});

//  @route       DELETE api/messages/:id
//  @desc        Delete message
//  @access      Private
router.delete('/:id', (req, res) => {
  res.send('Delete message');
});

module.exports = router;
