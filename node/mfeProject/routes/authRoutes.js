
const express = require('express');
const { getUsers,login, register } = require('../controllers/authController'); 
const router = express.Router();

router.get('/users', getUsers);
router.post('/login',login)
router.post('/register',register)

module.exports = router;
