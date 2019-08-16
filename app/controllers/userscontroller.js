const User = require('../models/user')

module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(function(user) {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateToken()
        })
        .then(token => {
            res.json({token,body})
            // res.json({token})
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const {user} = req
    res.json(user)
}

module.exports.logout = (req, res) => {
    const {user, token} = req
    console.log(token)
    
    User.findByIdAndUpdate(user_id, { $pull: { tokens: {token: token}}})
    .then( function(){
        res.send({notice: 'successfully logged out'})
    })
    .catch(err => {
        res.send(err)
    })

}