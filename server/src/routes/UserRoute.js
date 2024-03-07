const express = require('express')
const UserController = require('../controllers/UserController')
const {
  signupValidation,
  signinValidation,
  emailValidation,
  handleValidationResult,
} = require('../middleware/validationMiddlewares')

const router = express.Router()

router.get('/', UserController.getUsers)

router.post(
  '/signup',
  signupValidation,
  handleValidationResult,
  UserController.signup,
)

router.post(
  '/signin',
  signinValidation,
  handleValidationResult,
  UserController.signin,
)

router.post(
  '/request-reset-password',
  emailValidation,
  handleValidationResult,
  UserController.requestResetPassword,
)

router.post(
  '/reset-password',
  signupValidation,
  handleValidationResult,
  UserController.resetPassword,
)

module.exports = router
