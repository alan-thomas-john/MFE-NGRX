
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const db = require('../config/db');
//const secretKey = 'your_secret_key';
const User = require('../models/User');
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

        // const userrows = await db.query('SELECT * FROM users');
        // console.log(userrows);
        // const users = userrows.rows
        const { email, password } = req.body;
        const existingUser = await User.findOne(email);

       // const user = users.find(u => u.email === email && u.password === password)

        if (existingUser) {
            if(existingUser.password===password){
                res.status(200).send({ message: 'Login successful' });
            }else{
                res.status(401).send({ message: 'Invalid  password' });
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
        // const userrows = await db.query('SELECT * FROM users');
        // console.log(userrows);
        // const users = userrows.rows
        // const existingUser = users.find(u => u.email === email)
        const existingUser = await User.findOne(email); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User(email,name, password, position);
        const savedUser = await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: savedUser });

    } catch (err) {
        console.error('Registration error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    login,
    register

}
