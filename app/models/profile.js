const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bio: {
        type: String
    },
    education: [
        {
            university: {
                type: String
            },
            institition: {
                type: String
            },
            stream: {
                type: String
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile