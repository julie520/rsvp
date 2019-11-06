const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middleware/auth');

signToken = (user) => {
  const payload = {
    user: {
      id: user.id
    }
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER,
    subject: user.id,
    expiresIn: process.env.JWT_EXPIRESIN
  });
}

router.post('/register', [
  check('name', 'Please provide a name').not().isEmpty(),
  check('email', 'Please provide a vaild email').isEmail(),
  check('password', 'Please provide 6 character long password').isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'user already exists' });
      }
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = signToken(user);
      res.send({ token });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
})

router.post('/login', [
  check('email', 'Please provide a vaild email').isEmail(),
  check('password', 'Please provide 6 character long password').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const token = signToken(user);
      res.send({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
})

router.get('/', auth, async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})
module.exports = router;