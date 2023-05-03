const postRouter = require("express").Router();
const postController = require('./controllers/post');

postRouter.get('/posts', postController.list);
postRouter.post('/posts', postController.create);
postRouter.patch('/posts/:id', postController.update);
postRouter.delete('/posts/:id', postController.destroy);

module.exports = postRouter