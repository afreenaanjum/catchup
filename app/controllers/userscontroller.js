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
// to send friend request
module.exports.add = (req, res) => { 
    const newUserId = req.params.id
    console.log(newUserId)
    // First find whether the user exist or not
    User.findById(newUserId)
        .then(newuser => {
            if(newuser){
                //If user present find the user is already a friend 
                User.findById(req.user._id)
                .then(user => {
                    if(user){
                        if(!user.friends.includes(newUserId)){
                            if(!user.friendrequests.includes(newUserId)){
                                user.friendrequests.push(newUserId)
                                user.save()
                                res.json("Friend request send")
                            }else{
                                res.json('Your request is pending')
                            }
                        }else{
                            res.json('You are already Friend with this person')
                        }
                    }
                })
                .catch(err => {
                    res.json(err)
                })
            } else {
                res.json('Person not found')
            }
        })
        .catch(err => {
            res.json (err)
        })
}

module.exports.accept = (req, res) => {
    const newuser = req.params.id
    console.log(newuser)
    console.log(req.user._id)
    User.findById(req.user._id)
        .then(user => {
            if(user){
                if(!user.friends.includes(newuser)){
                    if(user.friendrequests.includes(newuser)){
                        user.friendrequests.splice(user.friendrequests.indexOf('newuser'),1)
                        user.friends.push(newuser)
                        user.save()
                        res.json('Friend request accepted')
                    }else {
                        res.json('no request found')
                    } 
                }else {
                    res.json('Already accepted')
                }
                  
            }else {
                res.status('404').json('Try after some time')
            }
        })
        .catch(err => {
            res.status('404').json('something went wrong')
        })
}