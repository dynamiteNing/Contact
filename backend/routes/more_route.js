const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    subscribe, /* POST, subscribe an artist */
    getPurchased, /* GET, get all the artists had been subscribed of an user */
    postQuote, /* POST, change the quote of an user */
    changeAvatar, /* POST, change the avatar of an user */
} = require('../controllers/more_controller');

router.route('/more/subscribe').post(wrapAsync(subscribe));
router.route('/more/purchased').get(wrapAsync(getPurchased));
router.route('/more/quote').post(wrapAsync(postQuote));
router.route('/more/avatar').post(wrapAsync(changeAvatar));

module.exports = router;