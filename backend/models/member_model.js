const { db } = require('../utils/db_connect')

const MEMBER_ROLE = {
    ALL: -1,
    ARTIST: 1,
    FAN: 2,
};

const checkEmail = async function (email) {
    const result = await db('find', 'member', { 'email': email });
    if (result.length > 0) {
        return result[0];
    } else {
        return result;
    }
}

const signIn = async function (id, password) {
    
}

module.exports = {
    MEMBER_ROLE,
    checkEmail,
    signIn
};
