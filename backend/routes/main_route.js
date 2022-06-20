const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    checkEmail,
    checkJwtExpire,
    signIn,
    signUp,
} = require('../controllers/main_controller');

router.route('/main').get(wrapAsync(checkEmail));
router.route('/main/jwt').get(wrapAsync(checkJwtExpire));
router.route('/main/signin').post(wrapAsync(signIn));
router.route('/main/signup').post(wrapAsync(signUp));

module.exports = router;