const MenuItem = require('../models/MenuItem');

class MenuItemController {
    static async addMenuItem(req, res) {
        const { itemName, price, description, picture } = req.body;
        try {
            await MenuItem.addMenuItem(itemName, price, description, picture);
            res.status(201).json({ message: 'Menu item added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllMenuItems(req, res) {
        try {
            const items = await MenuItem.getAllMenuItems();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateMenuItem(req, res) {
        const { id } = req.params;
        const { itemName, price, description, picture } = req.body;
        try {
            await MenuItem.updateMenuItem(id, itemName, price, description, picture);
            res.status(200).json({ message: 'Menu item updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteMenuItem(req, res) {
        const { id } = req.params;
        try {
            await MenuItem.deleteMenuItem(id);
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MenuItemController;

