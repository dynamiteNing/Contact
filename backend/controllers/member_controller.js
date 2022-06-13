const env = require('dotenv').config().parsed;
const validator = require('validator');
const Member = require('../models/member_model')

const checkEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).send({ error: 'Request Error: email is required.' });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).send({ error: 'Request Error: Invalid email format' });
        return;
    }

    const result = await Member.checkEmail(email);
    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (!result.id) {
        res.status(500).send({ error: 'Database Query Error' });
        return;
    }

    res.status(200).send({
        data: {
            member: {
                id: result.id,
                email: result.email,
                role: result.role,
            },
        },
    });
}

module.exports = {
    checkEmail,
};
