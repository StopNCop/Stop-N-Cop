const { isAuthorized } = require("../../utils/auth-utils");

const updateEmail = async (req, res) => {
	const {
		session,
		db: { User },
		params: { id },
		body: { email },
	} = req;

	if (!isAuthorized(id, session)) return res.sendStatus(403);

	const user = await User.find(id);
	if (!user) return res.sendStatus(404);

	const updatedEmail = await user.update(email);
	res.send(updatedEmail);
};

module.exports = updateEmail;
