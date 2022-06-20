const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    getRooms,
} = require('../controllers/chat_controller');

router.route('/chat').get(wrapAsync(getRooms));

module.exports = router;