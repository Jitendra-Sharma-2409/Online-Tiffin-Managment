const db = require('../config/db');

class MenuItem {
    static async addMenuItem(itemName, price, description, picture) {
        const [result] = await db.execute(
            'INSERT INTO MenuItems (item_name, price, description, picture) VALUES (?, ?, ?, ?)',
            [itemName, price, description, picture]
        );
        return result;
    }

    static async getAllMenuItems() {
        const [rows] = await db.query('SELECT * FROM MenuItems');
        return rows;
    }

    static async updateMenuItem(id, itemName, price, description, picture) {
        const [result] = await db.execute(
            'UPDATE MenuItems SET item_name = ?, price = ?, description = ?, picture = ? WHERE id = ?',
            [itemName, price, description, picture, id]
        );
        return result;
    }

    static async deleteMenuItem(id) {
        const [result] = await db.execute('DELETE FROM MenuItems WHERE id = ?', [id]);
        return result;
    }
}

module.exports = MenuItem;
