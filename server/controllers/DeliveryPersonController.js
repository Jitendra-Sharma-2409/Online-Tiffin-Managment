const DeliveryPerson = require('../models/DeliveryPerson');

class DeliveryPersonController {
    static async getAllDeliveryPersons(req, res) {
        try {
            const deliveryPersons = await DeliveryPerson.getAll();
            res.status(200).json(deliveryPersons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DeliveryPersonController;
