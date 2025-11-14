const walletService = require('../services/walletService');
class WalletController {

    async createWallet(req, res) {
        try {
            const newWallet = await walletService.createWallet(req.body);
            res.status(201).json(newWallet);
        } catch (error) {
            if (error.message === 'A Wallet with this email already exists') {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error creating wallet', error });
        }
    }

    async getAllWallets(req, res) {
        try {
            const wallets = await walletService.getAllWallets();
            res.status(200).json(wallets);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching wallets', error });
        }
    }

    async manageWallet(req, res) {
        const { userId } = req.params;
        try {
            const wallet = await walletService.getWalletByUserId(userId);
            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }
            res.status(200).json(wallet);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching wallet', error });
        }
    }

    async deleteWallet(req, res) {
        const { id } = req.params;
        try {
            const deleted = await walletService.deleteWallet(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Wallet not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting wallet', error });
        }
    }
}

module.exports = new WalletController();

