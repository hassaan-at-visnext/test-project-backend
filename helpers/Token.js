const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

class Token {
	static getLoginToken(user) {
		let loginToken = jsonwebtoken.sign(
			{ id: user.user_id },
			config.secretKey,
			{ expiresIn: config.timeouts.login }
		);

		return loginToken;
	}

	static verifyToken(token, secretKey) {
		try {
			const decoded = jsonwebtoken.verify(token, secretKey);
			return decoded || false;
		} catch (error) {
			console.log(`verifyToken:: Could not verify the token. \n token:: ${token} \n secretKey:: ${secretKey}`);
			return false;
		}

	}
}

module.exports = Token;