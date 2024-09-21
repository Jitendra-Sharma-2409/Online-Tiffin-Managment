const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

// Add more routes as needed
router.get('/all', UserController.getUsers);
router.put('/:id/role', UserController.updateUserRole);


module.exports = router;
