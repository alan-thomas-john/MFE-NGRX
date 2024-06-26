
const express = require('express');
const { getUsers,login, register, addProject, assignProjectToUsers } = require('../controllers/authController'); 
const router = express.Router();

router.get('/users', getUsers);
router.post('/login',login);
router.post('/register',register);
router.post('/project',addProject)
router.post('/assign',assignProjectToUsers)
module.exports = router;
