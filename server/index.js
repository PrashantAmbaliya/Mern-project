const express = require('express');
const router = require('./routes/apiRouter');
const softAuth = require('./auth/softAuth');
const cors = require('cors');
const DBconnection = require('./connection/DBconnection');
require('dotenv').config();

const app = express();
const port = 8500;

DBconnection()
    .then(() => console.log("Database Connected.."))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(softAuth);
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
