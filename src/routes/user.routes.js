const express = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

const userValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  validate
];

router.post('/', userValidation, UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', userValidation, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;