
const express = require('express');
const { verifyToken } = require('../middleware/authenticateToken');
const { getUsers,login, register, addProject, assignProjectToUsers, deleteEmployee, deleteProject, getProject } = require('../controllers/authController'); 
const router = express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/login',login);
router.post('/register',register);
router.post('/project',verifyToken,addProject)
router.post('/assign',assignProjectToUsers)
router.delete('/user',deleteEmployee)
router.delete('/project',deleteProject)
router.get('/project',verifyToken,getProject)
module.exports = router;
