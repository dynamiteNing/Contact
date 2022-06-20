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
}

module.exports = {
    getRooms,
};
