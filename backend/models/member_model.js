const env = require('dotenv').config().parsed;
const { query } = require('../utils/db_connect')

const MEMBER_ROLE = {
    ALL: -1,
    ARTIST: 1,
    FAN: 2,
};

const checkEmail = async function (email) {
    const sql = 'SELECT id, role, email FROM members WHERE email = ?;';
    let result = await query(sql, [email]);
    return { result };
}

module.exports = {
    MEMBER_ROLE,
    checkEmail,
};
