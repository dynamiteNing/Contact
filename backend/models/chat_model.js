const { db } = require('../utils/db_connect');

const getRooms = async function (email) {
    const member = await db('find', 'member', { 'email': email });

    if (member.length <= 0) {
        return member;
    }
    const rooms = member[0].rooms;

    const result = db('find', 'fanclub', {'artist': {$in: Object.keys(rooms)}});

    return result;
};

module.exports = {
    getRooms,
};
