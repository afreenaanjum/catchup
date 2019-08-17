const Post = require('../models/post')

//To list all the posts of the user
module.exports.list = (req, res) => {

    Post.find({ userId: req.user._id })
        .then((posts) => {
            res.json(posts)
        })
        .catch((err) => {
            res.json(err)
        })
}

//To create a post by the user 
module.exports.create = (req, res) => {

    const data = req.body
    console.log(req.file)
    const filePath = req.file.path.replace(/\\/g, '/')// Just a small hack to correct the filepath which looks public//uploads//post-img-123456789
    const post = new Post({ ...data, image: filePath })
    post.userId = req.user._id
    post.save()
        .then((post) => {
            res.json(post)
        })
        .catch((err) => {
            res.json(err)
        })
}



module.exports.destroy = (req, res) => {
    const id = req.params.id

    Post.findOneAndDelete({ userId: req.user._id, _id: id })
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.status('404').json({})
            }
        })
        .catch((err) => {
            res.status('404').json({})
        })
}