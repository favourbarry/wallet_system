const express = require('express');
const walletController = require('../controllers/walletController');
const apiKeyAuth = require('../middleware/apiKey');

                                                                      
const router = express.Router();                                                        
//public route - no API key required
router.post('/wallets', walletController.createWallet.bind(walletController));
//protected routes
router.get('/wallets', apiKeyAuth, walletController.getAllWallets.bind(walletController));
router.put('/wallets/:userId', apiKeyAuth, walletController.manageWallet.bind(walletController));                                                        
router.delete('/wallets/:id', apiKeyAuth, walletController.deleteWallet.bind(walletController)); 

module.exports = router;  
