const fs = require('fs');

const wrapAsync = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    };
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

module.exports = {
    wrapAsync,
    getRandomInt,
};
