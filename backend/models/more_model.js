const { db } = require('../utils/db_connect');

const subscribe = async function (email, artist, time) {
    const result = await db('insert', 'subscription', { 'email': email, 'artist': artist, 'subcription_date': new Date(time)});
    const object_name = `rooms.${artist}`;
    const updateRooms = await db('update', 'member', [{ 'email': email }, { $set: { [object_name]: new Date(time)}}]);
    return updateRooms;
};

const getPurchased = async function (email) {
    const result = await db('find', 'subscription', {'email': email});
    return result;
}

module.exports = {
    subscribe,
    getPurchased,
};
