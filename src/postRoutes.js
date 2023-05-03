const postRouter = require("express").Router();
const postController = require('./controllers/post')

postRouter.get('/posts', postController.list)

module.exports = postRouter