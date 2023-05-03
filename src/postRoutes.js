const postRouter = require("express").Router();
const postController = require('./controllers/post');

postRouter.get('/posts', postController.list);
postRouter.post('/posts', postController.create);
postRouter.patch('/posts/:id', postController.update);

module.exports = postRouter