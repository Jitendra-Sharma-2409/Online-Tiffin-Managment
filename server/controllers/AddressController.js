const Address = require('../models/Address');

class AddressController {
    static async createAddress(req, res) {
        const { userId, address, city, state, pinCode } = req.body;

        try {
            const result = await Address.createAddress(userId, address, city, state, pinCode);
            res.status(201).json({ message: 'Address created successfully', addressId: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add more controller methods as needed
}

module.exports = AddressController;
