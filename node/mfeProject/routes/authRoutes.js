
const express = require('express');
const { getUsers,login, register, addProject, assignProjectToUsers, deleteEmployee, deleteProject, getProject } = require('../controllers/authController'); 
const router = express.Router();

router.get('/users', getUsers);
router.post('/login',login);
router.post('/register',register);
router.post('/project',addProject)
router.post('/assign',assignProjectToUsers)
router.delete('/user',deleteEmployee)
router.delete('/project',deleteProject)
router.get('/project',getProject)
module.exports = router;
