const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    checkEmail, /* GET, check whether an email has been signed up */
    checkJwtExpire, /* GET, check an JWT token is legal or not */
    signIn, /* POST, sign in as an existing account */
    signUp, /* POST, sign up as an new account */
} = require('../controllers/main_controller');

router.route('/main').get(wrapAsync(checkEmail));
router.route('/main/jwt').get(wrapAsync(checkJwtExpire));
router.route('/main/signin').post(wrapAsync(signIn));
router.route('/main/signup').post(wrapAsync(signUp));

module.exports = router;