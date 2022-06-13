const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    checkEmail,
    signIn,
} = require('../controllers/member_controller');

router.route('/member/checkemail').post(wrapAsync(checkEmail));
router.route('/member/signin').post(wrapAsync(signIn));

module.exports = router;