const Chat = require('../models/chat_model');

const getRooms = async (req, res) => {
    const { email } = req.query;

    let result = await Chat.getRooms(email);

    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }
    
    if (result.length <= 0) {
        res.status(404).send({ message: `The email ${email} has no room.` });
        return;
    }
    
    res.status(200).send({
        data: {
            rooms: result,
        },
    });
};

const postChatMessage = async (req, res) => {
    const { email, role, room, time, message } = req.body;

    let result = await Chat.postChatMessage(email, role, room, time, message);

    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (result.length <= 0) {
        res.status(404).send({ message: 'cannot insert the chat message' });
        return;
    }

    res.status(200).send({
        data: {
            message: result,
        },
    });
};

const getChatMessage = async (req, res) => {
    const { email, role, room } = req.query;

    let result = await Chat.getChatMessage(email, role, room);

    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (result.length <= 0) {
        res.status(404).send({ message: `The user ${email} has no chat history` });
        return;
    }

    res.status(200).send({
        data: {
            history: result,
        },
    });
};

const getUnreadCount = async (req, res) => {
    const { email, role, room } = req.query;

    let result = await Chat.getUnreadCount(email, role, room);

    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (result.length <= 0) {
        res.status(404).send({ message: `The user ${email} has no unread in room ${room}` });
        return;
    }

    res.status(200).send({
        data: {
            count: result,
        },
    });
};

module.exports = {
    getRooms,
    postChatMessage,
    getChatMessage,
    getUnreadCount,
};
