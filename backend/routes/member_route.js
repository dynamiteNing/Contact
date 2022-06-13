const router = require('express').Router();
const {
    wrapAsync,
} = require('../utils/util');

const {
    checkEmail,
} = require('../controllers/member_controller');

router.route('/member/checkemail').post(wrapAsync(checkEmail));

module.exports = router;