const router = require('express').Router();
const {check, validationResult } = require('express-validator');
const Guest = require('../models/Guest');
const User = require('../models/User');

router.get('/', async(req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id });
    res.json(guests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

router.post('/', [
  check('name', 'Please provide name').not().isEmpty(),
  check('phone', 'Please provide phone').not().isEmpty(),
  check('dietary', 'Please provide dietary').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, phone, dietary, isconfirmed } = req.body;
    try {
      const guest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isconfirmed
      });

      await guest.save();

      res.json(guest);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
})

router.delete('/:id', async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }

    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Guest.findByIdAndRemove(req.params.id);
    res.send('guest removed');

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const { name, phone, dietary, isconfirmed } = req.body;
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: 'Guest not found' });
    }

    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const updateGuest = {name, phone, dietary, isconfirmed};
    
    guest = await Guest.findByIdAndUpdate(req.params.id, { $set: updateGuest }, { new: true });
    res.json(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;