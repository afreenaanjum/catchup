const Profile = require('../models/profile')

module.exports.create = (req,res)=> {
    const body = req.body
    console.log(body)
    const profile = new Profile({bio: body.bio, education: body.education,user : req.user._id})
    profile.save()
        .then(profile => {
            res.json(profile)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.list = (req, res) => {
    Profile.find({user: req.user._id})
    .then((profile) => {
        res.json(profile)
    })
    .catch(err => {
        res.json(err)
    })
}




module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
        Profile.findOneAndUpdate(id, { $set: body }, { new: true, runValidators: true })
            .then(profile => {
                if (profile) {
                    res.json(profile)
                } else {
                    res.status('404').json({})
                }
            })
            .catch(err => {
                res.json(err)
            })
        
        .catch(err => {
            res.json(err)
        })
}


module.exports.destroy = (req, res) => {
    const id = req.params.id

    Profile.findOneAndDelete(id)
        .then(profile => {
            if(profile){
                res.json('successfully deleted')
            } else {
                res.status('404').json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}