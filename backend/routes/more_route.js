const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    subscribe,
    getPurchased,
} = require('../controllers/more_controller');

router.route('/subscribe').post(wrapAsync(subscribe));
router.route('/purchased').get(wrapAsync(getPurchased));

module.exports = router;