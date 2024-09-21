const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

class UserController {
    static async signup(req, res) {
        const { username, phone_number, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await User.createUser(username, phone_number, email, hashedPassword);
            res.status(201).json({ message: 'User created successfully', userId: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '24h' });

            // Send token and role in response
            res.status(200).json({ token, role: user.role });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUserRole(req, res) {
        const { id } = req.params;
        const { role } = req.body;

        try {
            const result = await User.updateUserRole(id, role);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User role updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
