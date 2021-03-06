const { db } = require('../utils/db_connect');
const { getRandomInt } = require('../utils/util');
const { ObjectId } = require('mongodb'); 

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
};

const signIn = async function (id, hashed_password) {
    const result = await db('find', 'member', { '_id': ObjectId(id), 'hashed_password': hashed_password });
    if (result.length > 0) {
        return result[0];
    } else {
        return result;
    } 
};

const signUp = async function (email, name, hashed_password, join_date){
    /* CHECK WHETHER IT IS A REGISTERED ARTIST ACCONT */
    const register = await db('find', 'register', { 'email': email });
    let rooms = {};
    let role = MEMBER_ROLE.ALL;
    const quote = 'None';
    let avatar;
    if (register.length === 1) {
        role = MEMBER_ROLE.ARTIST;
        avatar = `${name}.png`;
        rooms = {
            [name]: {
                join_date: new Date(join_date),
                last_read: new Date('1900-01-01')
            }
        };
        const updateRegister = await db('update', 'register', [{ 'email': email }, { $set: { 'artist': name } }]);
        const initialChat = await db('insert', 'chatHistory', { 'email': email, 'role': role, 'room': register[0].fanclub, 'initial': true, 'message': `Welcome to ${name}'s room!` });
    } else {
        role = MEMBER_ROLE.FAN;
        avatar = `default_${getRandomInt(12) + 1}.png`;
    }
    const result = await db('insert', 'member', { 'email': email, 'name': name, 'hashed_password': hashed_password, 'join_date': new Date(join_date), 'role': role, 'rooms': rooms, 'quote': quote, 'avatar': avatar });
    return result;
};

module.exports = {
    MEMBER_ROLE,
    checkEmail,
    signIn,
    signUp,
};
