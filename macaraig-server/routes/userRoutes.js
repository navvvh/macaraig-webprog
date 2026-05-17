const express = require('express');
const router = express.Router();
const { getUsers, createUser, loginUser, updateUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);

module.exports = router;