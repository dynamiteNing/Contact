const validator = require('validator');
const Member = require('../models/main_model');
const { authenticateToken, generateAccessToken, hmac, expireToken } = require('../utils/token');

const checkJwtExpire = async (req, res) => {
    const { timestamp } = req.query;
    const expired = await expireToken(timestamp);
    res.status(200).send({ message: expired });
    return;
};

const checkEmail = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        res.status(400).send({ message: 'email required' });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).send({ error: 'invalid email' });
        return;
    }

    const bearerHeader = req.headers['authorization'];

    /* CHECK THE JWTTOKEN */
    if (bearerHeader) {
        let jwtToken;
        try {
            jwtToken = bearerHeader.split(' ')[1];
        } catch (error) {}
        if (jwtToken !== 'null') {
            try {
                const payload = await authenticateToken(jwtToken);
                if (email !== payload.email){
                    res.status(400).send({ message: 'fake token' });
                    return;
                }
                const token = await generateAccessToken({ id: payload.id, role: payload.role, email: payload.email, name: payload.name });
                res.status(201).send({
                    message: 'jwtToken',
                    data: {
                        jwtToken: token,
                        member: {
                            id: payload.id,
                            role: payload.role,
                            email: email,
                            name: payload.name,
                        },
                    },
                });
                return;
            } catch (error) { res.status(500).send({ error: result.error }); }
            return;
        }
    }

    const result = await Member.checkEmail(email);
    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (!result._id) {
        res.status(404).send({ message: 'not signed' });
        return;
    }

    res.status(200).send({
        data: {
            member: {
                id: result._id,
            },
        },
    });
};

const signIn = async (req, res) => {
    const { id, password } = req.body;
    if (!id || !password ) {
        res.status(400).send({ message: 'password required' });
        return;
    }

    const hashed_password = await hmac(password);
    const result = await Member.signIn(id, hashed_password);

    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (!result._id) {
        res.status(404).send({ message: 'wrong password' });
        return;
    }

    const token = await generateAccessToken({ id: id, role: result.role, email: result.email, name: result.name });
    res.status(200).send({
        message: 'jwtToken',
        data: {
            jwtToken: token,
            member: {
                id: id,
                role: result.role,
                email: result.email,
                name: result.name,
            },
        },
    });
};

const signUp = async (req, res) => {
    const { email, name, password, password_check, join_date } = req.body;
    
    let result = await Member.checkEmail(email);
    if (result._id) {
        res.status(404).send({ message: `The email ${email} had been registered.` });
        return;
    }

    if (password !== password_check) {
        res.status(400).send({ message: 'The password not match the check password.' });
        return;
    }

    const hashed_password = await hmac(password);
    result = await Member.signUp(email, name, hashed_password, join_date);

    if (result.error) {
        res.status(403).send({ error: result.error });
        return;
    }

    if (!result.insertedId) {
        res.status(500).send({ message: 'Cannot register.' });
        return;
    }

    res.status(200).send({
        data: {
            member: {
                id: result.insertedId,
            },
        },
    });
};

module.exports = {
    checkEmail,
    checkJwtExpire,
    signIn, 
    signUp,
};
