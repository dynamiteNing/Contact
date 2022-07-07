const { db } = require('../utils/db_connect');

const getFriends = async function (email) {
    const member = await db('find', 'member', { 'email': email });

    if (member.length <= 0) {
        return member;
    }

    const rooms =  member[0].rooms;

    const result = await db('find', 'member', { 'name': { $in: Object.keys(rooms)}, 'role': 1 });

    return result;
};

const getNotfriends = async function (email) {
    const member = await db('find', 'member', { 'email': email });

    if (member.length <= 0) {
        return member;
    }

    const rooms =  member[0].rooms;

    const result = await db('find', 'member', { 'name': { $nin: Object.keys(rooms)}, 'role': 1 });

    return result;
};

const getProfile = async function (artist) {
    const result = await db('find', 'member', { 'name': artist });

    if (result.length <= 0) {
        return result;
    }

    return result[0];
};

module.exports = {
    getFriends,
    getNotfriends,
    getProfile,
};
