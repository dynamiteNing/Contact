const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    getFriends, /* GET, all the friends of an user */
    getNotfriends,  /* GET, all the artists that are not friends of an user */
    getProfile, /* GET, the profile an user */
} = require('../controllers/directory_controller');

router.route('/directory').get(wrapAsync(getProfile));
router.route('/directory/friends').get(wrapAsync(getFriends));
router.route('/directory/notfriends').get(wrapAsync(getNotfriends));

module.exports = router;