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

    if (!result._id) {
        res.status(404).send({ message: 'The email was not signed up' });
        return;
    }

    res.status(200).send({
        data: {
            member: {
                id: result._id,
                role: result.role,
            },
        },
    });
}

const signIn = async (req, res) => {
    const { id, password } = req.body;
    if (!id || !password) {
        res.status(400).send({ error: 'Request Error: password is required.' });
        return;
    }

    const result = await Member.signIn(id, password);
    
}

module.exports = {
    checkEmail,
    signIn
};
