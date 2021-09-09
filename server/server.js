const express = require('express');
const PORT = 5000;
const app = express();
const { get } = require("http");

app.use(express.urlencoded({ extended: true}));

app.use(express.static('server/public'));





app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);   
});