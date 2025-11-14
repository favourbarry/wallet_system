const crypto = require('crypto');
const db = require('../../utils/database.js');

class ApikeyService {
    generateApiKey(userId){
        return new Promise((resolve, reject) => {
            //generate a unique  API key
            const apiKey = crypto.randomBytes(32).toString('hex');
            //Insert API key into database
            const sql = 'Insert into  api_keys (user_id, api_key) values (?, ?)';
            db.query(sql, [userId, apiKey], (err, result) => {
                if (err) return reject (err);
                resolve({userId, apiKey});
            });
        });
    }
    validateApiKey(apiKey){
        return new Promise((resolve, reject) => {
            const sql = 'Select user_id from api_keys where api_key = ? and is_active = true';
            db.query(sql, [apiKey], (err, results) => {
                if (err) return reject (err);
                if (results.length > 0){
                    resolve (results[0].user_id);
                }else{
                    resolve (null);
                }
            });
        });
    }
}

module.exports = new ApikeyService();