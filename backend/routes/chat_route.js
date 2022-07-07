const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    getRooms, /* GET, all the rooms of an user */
    postChatMessage, /* POST, store a chat message by user and time and message */
    getChatMessage, /* GET, all the messages of an user in the room */
    getUnreadCount, /* GET, count the number of unread message */
    lastreadTime, /* GET, the time that an user last shown in the room */
} = require('../controllers/chat_controller');

router.route('/chat').get(wrapAsync(getRooms));
router.route('/chat/message').post(wrapAsync(postChatMessage));
router.route('/chat/message').get(wrapAsync(getChatMessage));
router.route('/chat/message/unread').get(wrapAsync(getUnreadCount));
router.route('/chat/message/unread').post(wrapAsync(lastreadTime));

module.exports = router;