const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    checkEmail,
    signIn,
    signUp,
} = require('../controllers/main_controller');

router.route('/main').get(wrapAsync(checkEmail));
router.route('/main/signin').get(wrapAsync(signIn));
router.route('/main/signup').post(wrapAsync(signUp));

module.exports = router;