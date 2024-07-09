
const express = require('express');
const { verifyToken } = require('../middleware/authenticateToken');
const { getUsers,login, register, addProject, assignProjectToUsers, deleteEmployee, deleteProject, getProject } = require('../controllers/authController'); 
const router = express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/login',verifyToken,login);
router.post('/register',verifyToken,register);
router.post('/project',verifyToken,addProject)
router.post('/assign',verifyToken,assignProjectToUsers)
router.delete('/user/:id',verifyToken,deleteEmployee)
router.delete('/project',verifyToken,deleteProject)
router.get('/project',verifyToken,getProject)
module.exports = router;
