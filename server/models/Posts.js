const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    }
})

const PostModel = mongoose.model("BlogPosts",PostSchema)

module.exports= PostModel;