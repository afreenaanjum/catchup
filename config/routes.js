const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/userscontroller')
const authenticateUser = require('../app/middlewares/authendification')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.show)
router.delete('users/logout', authenticateUser, usersController.logout)

module.exports = router