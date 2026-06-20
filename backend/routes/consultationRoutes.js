const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { body } = require('express-validator');

// Validation Rules Array
const consultationValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please specify a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[0-9\s-]{7,15}$/).withMessage('Invalid phone number format'),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Project location is required')
    .isLength({ max: 250 }).withMessage('Location text is too long'),
  
  body('projectType')
    .notEmpty().withMessage('Project type is required')
    .isIn(['Residential', 'Commercial', 'Office', 'Luxury Villa', 'Apartment', 'Restaurant', 'Other'])
    .withMessage('Invalid project type category'),
  
  body('budget')
    .notEmpty().withMessage('Budget range selection is required'),
  
  body('designStyle')
    .notEmpty().withMessage('Design style selection is required'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Project vision details are required')
    .isLength({ max: 2000 }).withMessage('Message must not exceed 2000 characters')
];

// Route mapping: POST /api/consultation
router.post('/', consultationValidators, consultationController.createConsultation);

module.exports = router;
