const db = require('../config/db');

class DeliveryPerson {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM Users WHERE role = "delivery_person"');
        return rows;
    }
}

module.exports = DeliveryPerson;