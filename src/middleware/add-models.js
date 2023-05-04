const User = require('../db/models/user');
const Post = require('../db/models/post');
const Bookmark = require('../db/models/bookmark');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Post,
    Bookmark,
  };
  next();
};

module.exports = addModels;
