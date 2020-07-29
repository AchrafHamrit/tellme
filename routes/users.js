const express = require('express');
const router = express.Router();

//  @route       POST api/users
//  @desc        Register a user
//  @access      Public
router.post('/', (req, res) => {
  res.send('Register a user');
});

//  @route       PUT api/users/:id
//  @desc        Update a user
//  @access      Private
router.put('/:id', (req, res) => {
  res.send('Update a user');
});

module.exports = router;
