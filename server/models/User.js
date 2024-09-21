const db = require('../config/db');

class User {
    static async createUser(username, phone_number, email, password, role = 'client') {
        const [result] = await db.execute(
            'INSERT INTO Users (username, phone_number, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [username, phone_number, email, password, role]
        );
        return result;
    }

    static async findUserByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findUserById(id) {
        const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async updateUserRole(id, role) {
        const [result] = await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        return result;
    }
}

module.exports = User;
