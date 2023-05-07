const bookmarkRouter = require("express").Router();
const bookmarkController = require("./controllers/bookmark");

bookmarkRouter.get('/bookmarks', bookmarkController.list);
bookmarkRouter.post('/bookmarks', bookmarkController.create);
bookmarkRouter.delete('/bookmarks/delete', bookmarkController.destroy);

module.exports = bookmarkRouter;