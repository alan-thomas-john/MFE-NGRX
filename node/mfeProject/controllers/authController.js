
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt');
//const secretKey = 'your_secret_key';
const User = require('../models/User');
const Project = require('../models/Project');
const config = require('../config/config');


const filterUserResponse = (user) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        position: user.position,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const userResponse=users.map(user=>filterUserResponse(user))
        res.status(200).json(userResponse); // Send the user data as JSON response
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
                const passwordMatch = await bcrypt.compare(password, existingUser.password);
                if (passwordMatch) {
                    const token = jwt.sign({ username: existingUser.username, role: existingUser.role }, config.secretKey, { expiresIn: '8h' });
                    res.status(200).send({ message: 'Login successful',token });
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
        const userResponse=filterUserResponse(savedUser);

        return res.status(201).json({ message: 'User registered successfully', user: userResponse });

    } catch (err) {
        console.error('Registration error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }
        const existingUser = await User.findByPk(id);
        if (existingUser) {
            await User.destroy({ where: { id } })
            return res.status(200).json({ message: "User successfully deleted" });
        }
        return res.status(400).json({ message: 'No employee with id' });
    } catch (err) {
        console.error('Registration error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getProject = async(req,res) => {
    try {
        const projects = await Project.findAll();
        console.log(projects); // Log the rows to see the user data
        res.status(200).json(projects); // Send the user data as JSON response
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).send({ message: 'Internal server error' });
    }
}

const addProject = async (req, res) => {
    try {
        const { name, front_end, back_end, start_date, end_date } = req.body;

        if (!name || !front_end || !back_end || !start_date || !end_date) {
            return res.status(400).json({ message: 'All fields (name, front_end, back_end, start_date, end_date)  are required' });
        }
        const newProject = await Project.create({
            name,
            front_end,
            back_end,
            start_date,
            end_date
        });
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
const deleteProject = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }
        const existingProject = await Project.findByPk(id);
        if (existingProject) {
            const users = await User.findAll({ where: { projectId: id } });
            await Promise.all(users.map(user => user.deleteProject()));
            await Project.destroy({ where: { id } })
            return res.status(200).json({ message: "Project successfully deleted" });
        }
        return res.status(400).json({ message: 'No project with id' });
    } catch (err) {
        console.error('project deletion error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getUsers,
    login,
    register,
    addProject,
    assignProjectToUsers,
    deleteEmployee,
    deleteProject,
    getProject



}
