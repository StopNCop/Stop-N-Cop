const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, email},
  } = req;

  const user = await User.create(username, password, email);
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
