const { db } = require('../utils/db_connect');

const getRooms = async function (email) {
    const member = await db('find', 'member', { 'email': email });

    if (member.length <= 0) {
        return member;
    }
    const rooms = member[0].rooms;

    const result = await db('find', 'register', { 'artist': { $in: Object.keys(rooms) } });
    
    return result;
};

const postChatMessage = async function (email, role, room, time, message) {
    const result = await db('insert', 'chatHistory', { 'email': email, 'role': role, 'room': room, 'time': new Date(time), 'message': message });
    return result;
};

const getChatMessage = async function (email, role, room) {
    const rooms = await db('find', 'register', { $or: [{ 'artist': room }, { 'fanclub': room }] });
    const me = await db('find', 'member', { 'email': email });

    let emailConstraint = {};
    let fanInitialConstraint = {};

    const join_date = me[0].rooms[rooms[0].artist].join_date;

    role === '2' ? emailConstraint = {'email': email} : emailConstraint = {};
    role === '1' ? fanInitialConstraint = { $and: [ {'room': rooms[0].artist }, { 'role': 2 }, { 'initial': true } ]} : fanInitialConstraint = { $and: [ { 'room': rooms[0].fanclub }, { 'role': 1 }, { 'initial' : true } ] }

    let result = await db('find', 'chatHistory', {
        $or: [
            {
                $and: [
                    { 'room': rooms[0].fanclub },
                    { 'role': 1 },
                    { 'initial' : true }
                ]
            },
            {
                $and: [
                    { 'room': rooms[0].fanclub },
                    { 'role': 1 },
                    { 'time' : { $gte: join_date } },
                    { 'initial': { $ne: true } }
                ]
            }, 
            {
                $and: [
                    { 'room': rooms[0].artist },
                    { 'role': 2 },
                    emailConstraint,
                    { 'time' : { $gte: join_date } },
                    { 'initial': { $ne: true } }
                ]
            },
            fanInitialConstraint
        ]
    });

    let temp;
    for (let i = 0; i < result.length; i++) {
        temp = await db('find', 'member', {'email': result[i].email});
        result[i].name = temp[0].name;
        result[i].avatar = temp[0].avatar;
        if (result[i].initial && result[i].role === 1) {
            result[i].time = join_date;
        }
    }

    return result;
};

const getUnreadCount = async function (email, role, room) {
    const rooms = await db('find', 'register', { $or: [{ 'artist': room }, { 'fanclub': room }] });
    const me = await db('find', 'member', { 'email': email });

    let emailConstraint = {};

    const last_read = me[0].rooms[rooms[0].artist].last_read;

    role === '2' ? emailConstraint = {'email': email} : emailConstraint = {};

    const result = await db('find', 'chatHistory', {
        $or: [
            {
                $and: [
                    { 'room': rooms[0].fanclub },
                    { 'role': 1 },
                    { 'time': { $gte: last_read } },
                    { 'initial': { $ne: true } }
                ]
            },
            {
                $and: [
                    { 'room': rooms[0].artist },
                    { 'role': 2 },
                    emailConstraint,
                    { 'time': { $gte: last_read } },
                    { 'initial': { $ne: true } }
                ]
            }
        ]
    });

    return result.length;
};

const lastreadTime = async function (email, room, time) {
    const rooms = await db('find', 'register', { $or: [{ 'artist': room }, { 'fanclub': room }] });
    const last_read = `rooms.${rooms[0].artist}.last_read`;
    const result = await db('update', 'member', [{ 'email': email }, { $set: { [last_read]: new Date(time) }}]);
    return result;
};

module.exports = {
    getRooms,
    postChatMessage,
    getChatMessage,
    getUnreadCount,
    lastreadTime,
};
