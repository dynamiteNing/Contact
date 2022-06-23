const More = require('../models/more_model');
const axios = require('axios').default;
const env = require('dotenv').config().parsed;

const subscribe = async (req, res) => {
  const { email, artist, prime, name, phone, time } = req.body;
  
  console.log(email, artist, prime, name, phone, time);
    
    const post_data = {
        "prime": prime,
        "partner_key": env.PARTNER_KEY,
        "merchant_id": env.MERCHANT_ID,
        "amount": 120,
        "currency": "TWD",
        "details": 'Contact subscription',
        "cardholder": {
            "phone_number": "+886" + phone,
            "name": name,
            "email": email,
        },
        "remember": false
    }
    
    axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
        headers: {
            'x-api-key': env.PARTNER_KEY
        }
    }).then(async (response) => {
        if (response.data.status !== 0) {
            return res.status(500).send({ message: `The payment failed!` });
        }
        const result = await More.subscribe(email, artist, time);

        if (result.error) {
            res.status(403).send({ error: result.error });
            return;
        }
    
        if (result.length <= 0) {
            res.status(404).send({ message: `Cannot subscribe artist ${artist}.` });
            return;
        }
    
        res.status(200).send({
            data: {
                subscription: result,
            },
        });
    })
}

module.exports = {
    subscribe,
};
