const postRouter = require("express").Router();
const postController = require('./controllers/post');

postRouter.get('/posts', postController.list);
postRouter.post('/posts', postController.create);

module.exports = postRouter