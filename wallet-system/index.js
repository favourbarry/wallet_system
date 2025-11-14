const express = require('express');
const bodyParser = require('body-parser');
const walletRoutes = require('./src/routes/walletRoutes');

const app = express();
const PORT = process.env.PORT || 3009;

app.use(bodyParser.json());
app.use('/', walletRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});