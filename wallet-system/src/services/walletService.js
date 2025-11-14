const db = require('../../utils/database');

class WalletService {
    createWallet(data) {
        return new Promise((resolve, reject) => {
            const { firstName, lastName, email, balance, currency_id } = data;
            
            db.query('SELECT * FROM wallets WHERE email = ? and currency_id = ?', [email, currency_id], (err, results) => {
                if (err) return reject(err);
                if (results.length > 0){
                    // Wallet already exists
                    return reject(new Error('A Wallet with this user ID and currency ID already exists'));
                }
                const sql = 'INSERT INTO wallets (firstName, lastName, email, balance, currency_id) VALUES (?, ?, ?, ?, ?)';
                db.query(sql, [firstName, lastName, email, balance || 0.00, currency_id], async (err, result) => {
                    if(err) return reject(err);
                    try{
                        //generate API key for the new wallet

                        const apiKey = await apiKeyService.generateApiKey(result.insertId);
                        resolve({user_id: result.insertId, firstName, lastName, email, balance: balance || 0.00, currency_id});
                    }catch(apiKeyError){
                        return reject(apiKeyError);
                    }
                    
                });
            });
        });                                                        
    }

    getAllWallets(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wallets', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });  
        });
    }

    getWalletByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM wallets WHERE user_id = ?', [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }

    deleteWallet(userId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM wallets WHERE user_id = ?', [userId], (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0);
            });
        }); 
    }
} 

module.exports = new WalletService();