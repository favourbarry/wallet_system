const apiKeyService = require('../services/apiKeyService');
const apikeyAuth = async (req, res, next) => {

try{
        const apiKey = req.headers['x-api-key'] || req.headers['authorization'];

        if(!apiKey){
            return res.status(401).json({message: 'API key is missing'});
        }
        //remove Bearer prefix if present
        const cleanApiKey = apiKey.replace('Bearer ') ? apiKey.slice(7) : apiKey;
        const userId = await apiKeyService.validateApiKey(cleanApiKey);
        if(!userId){
            return res.status(401).json({message: 'Invalid API key'});
        }

        //Add user ID  to request object for use in controllers
        req.userId = userId;
        next();
    }
catch(error){
    console.error('API key validation error:', error);
    res.status(500).json({message: 'Internal server error'});
}
};
module.exports = apikeyAuth;