const bookmarkRouter = require("express").Router();
const bookmarkController = require("./controllers/bookmark");

bookmarkRouter.get('/bookmarks', bookmarkController.list);
bookmarkRouter.post('/bookmarks', bookmarkController.create);
bookmarkRouter.delete('/bookmarks/:id', bookmarkController.destroy);

module.exports = bookmarkRouter;