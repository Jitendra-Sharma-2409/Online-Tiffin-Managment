const db = require('../config/db');

class Address {
    static async createAddress(userId, address, city, state, pinCode) {
        const [result] = await db.execute(
            'INSERT INTO Addresses (user_id, address, city, state, pin_code) VALUES (?, ?, ?, ?, ?)',
            [userId, address, city, state, pinCode]
        );
        return result;
    }

    // Add more methods as needed
}

module.exports = Address;
