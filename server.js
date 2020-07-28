const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('it works!!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started, port: ${PORT}`));
