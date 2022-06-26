const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    getRooms,
    postChatMessage,
    getChatMessage,
} = require('../controllers/chat_controller');

router.route('/chat').get(wrapAsync(getRooms));
router.route('/chat/message').post(wrapAsync(postChatMessage));
router.route('/chat/message').get(wrapAsync(getChatMessage));

module.exports = router;