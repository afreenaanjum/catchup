const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/userscontroller')
const authenticateUser = require('../app/middlewares/authendification')
const profileController = require('../app/controllers/profilecontroller')

router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.get('/account', authenticateUser, usersController.show)
router.delete('users/logout', authenticateUser, usersController.logout)


router.post('/profile', authenticateUser, profileController.create)
router.get('/profile', authenticateUser, profileController.list)
router.put('/profile/:id', authenticateUser, profileController.update)
router.delete('/profile/:id',authenticateUser, profileController.destroy)

module.exports = router