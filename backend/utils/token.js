const jwt = require('jsonwebtoken');
const env = require('dotenv').config().parsed;
const crypto = require('crypto');
const EXPIRES_IN = env.EXPIRES_IN;

const hmac = async (plaintext) => {
    const buf = Buffer.from(plaintext);
    const hased = crypto.createHmac('sha256', env.CRYPTO_SECRET).update(buf).digest('hex');
    return hased;
};

const generateAccessToken = async (payload) => {
    return jwt.sign(payload, env.TOKEN_SECRET, { expiresIn: EXPIRES_IN });
}

const authenticateToken = async (token) => {
    try {
        const payload = jwt.verify(token, env.TOKEN_SECRET);
        return payload;
    } catch (err) {
        return err;
    }
}

module.exports = { hmac, generateAccessToken, authenticateToken, EXPIRES_IN }
