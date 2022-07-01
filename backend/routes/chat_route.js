const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    getRooms,
    postChatMessage,
    getChatMessage,
    getUnreadCount,
    lastreadTime,
} = require('../controllers/chat_controller');

router.route('/chat').get(wrapAsync(getRooms));
router.route('/chat/message').post(wrapAsync(postChatMessage));
router.route('/chat/message').get(wrapAsync(getChatMessage));
router.route('/chat/message/unread').get(wrapAsync(getUnreadCount));
router.route('/chat/message/unread').post(wrapAsync(lastreadTime));

module.exports = router;