const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    subscribe,
} = require('../controllers/more_controller');

router.route('/subscribe').post(wrapAsync(subscribe));

module.exports = router;