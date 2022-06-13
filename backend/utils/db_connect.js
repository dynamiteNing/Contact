const mysql = require('mysql');
const env = require('dotenv').config().parsed;
const { promisify } = require('util');
const SqlString = require('sqlstring');
// const mysql2 = require('mysql2/promise');

async function query(sql, arg) {
    const connection = mysql.createConnection({
        host: env.HOST,
        user: env.USER,
        password: env.PASSWORD,
        database: env.DATABASE,
        multipleStatements: true
    });
    try {
        const query = promisify(connection.query).bind(connection);
        let result = await query(SqlString.format(sql, arg));
        connection.end();
        return result;
    } catch (err) {
        connection.end();
        return err;
    }
};

// async function transaction(sqls, args) {
//     const connection = await mysql2.createConnection({
//         host: env.HOST,
//         user: env.USER,
//         password: env.PASSWORD,
//         database: env.DATABASE
//     });
//     await connection.beginTransaction();
//     // resultsList = [];
//     try {
//         sqls.forEach(async (sql, index) => {
//             // const result =
//             await connection.execute(sql, args[index]);
//             // [0];
//             // resultsList.push(result);
//         });
//         await connection.commit();
//         connection.end();
//         return 200;
//         // return resultsLinst;
//     } catch (err) {
//         connection.rollback();
//         connection.end();
//         return err;
//     }
// }


module.exports = { query }; //, transaction
