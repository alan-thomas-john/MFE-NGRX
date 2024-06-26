
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const db = require('../config/db');
//const secretKey = 'your_secret_key';
const User = require('../models/User');
const Project = require('../models/Project');
const getUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        console.log(result.rows); // Log the rows to see the user data
        res.status(200).json(result.rows); // Send the user data as JSON response
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).send({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const existingUser = await User.findOneByEmail(email);
        if (existingUser) {
            if (existingUser.role == 'ADMIN') {
                if (existingUser.password === password) {
                    res.status(200).send({ message: 'Login successful' });
                } else {
                    res.status(401).send({ message: 'Invalid  password' });
                }
            } else {
                res.status(401).send({ message: 'Does not have access' });
            }
        } else {
            res.status(401).send({ message: 'No such user exist' });
        }
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).send({ message: 'Internal server error' });
    }
};

const register = async (req, res) => {
    try {
        const { email, name, password, position } = req.body;

        if (!email || !name || !password || !position) {
            return res.status(400).json({ message: 'All fields (email, name, password, position) are required' });
        }
        // const userrows = await db.query('SELECT * FROM users');
        // console.log(userrows);
        // const users = userrows.rows
        // const existingUser = users.find(u => u.email === email)
        const existingUser = await User.findOneByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const role = 'USER';
        const newUser = await User.create({
            email,
            name,
            password,
            position,
            role
        });
        // const newUser = new User(email,name, password, position,role);
        const savedUser = await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: savedUser });

    } catch (err) {
        console.error('Registration error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const addProject = async (req, res) => {
    try {
        const { name, front_end,back_end, start_date, end_date } = req.body;

        if (!name || !front_end || !back_end || !start_date || !end_date) {
            return res.status(400).json({ message: 'All fields  are required' });
        }

        // const existingPro = await User.findOneByEmail(email);
        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists" });
        // }
        //const role = 'USER';
        const newProject = await Project.create({
            name,
            front_end,
            back_end,
            start_date,
            end_date
        });
        // const newUser = new User(email,name, password, position,role);
        const savedProject = await newProject.save();

        return res.status(201).json({ message: 'Project added successfully', project: savedProject });

    } catch (err) {
        console.error('Registration error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const assignProjectToUsers = async (req, res) => {
    try {
        const { projectId, userIds } = req.body;

        // Check if projectId and userIds are provided
        if (!projectId || !userIds || userIds.length === 0) {
            return res.status(400).json({ message: 'Both projectId and userIds are required and userIds must not be empty' });
        }

        // Find the project by projectId
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find all users by userIds
        const users = await User.findAll({ where: { id: userIds } });
        if (!users || users.length !== userIds.length) {
            return res.status(404).json({ message: 'One or more users not found' });
        }

        // Assign the project to all users
        await Promise.all(users.map(user => user.addProject(project)));

        return res.status(200).json({ message: 'Project assigned to users successfully', users });
    } catch (err) {
        console.error('Error assigning project to users', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    login,
    register,
    addProject,
    assignProjectToUsers

    

}
