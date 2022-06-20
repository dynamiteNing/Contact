const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    getFriends,
    getNotfriends,
    getProfile,
} = require('../controllers/directory_controller');

router.route('/directory').get(wrapAsync(getProfile));
router.route('/directory/friends').get(wrapAsync(getFriends));
router.route('/directory/notfriends').get(wrapAsync(getNotfriends));

module.exports = router;