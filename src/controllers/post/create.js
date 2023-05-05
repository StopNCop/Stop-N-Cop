const session = require("express-session");

const create = async (req, res) => {
    const {
      session,
      db: { Post },
      body: {name, link, city, price},
    } = req;
    const user_id = session.userId;
    const listing = await Post.create(user_id, name, link, city, price);
    res.send(listing);
  };
  
  module.exports = create;