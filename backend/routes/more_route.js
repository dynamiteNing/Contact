const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    subscribe,
    getPurchased,
    postQuote,
    changeAvatar,
} = require('../controllers/more_controller');

router.route('/more/subscribe').post(wrapAsync(subscribe));
router.route('/more/purchased').get(wrapAsync(getPurchased));
router.route('/more/quote').post(wrapAsync(postQuote));
router.route('/more/avatar').post(wrapAsync(changeAvatar));

module.exports = router;