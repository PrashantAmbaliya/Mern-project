const express = require('express')
require('dotenv').config()
const DBconnection = require('./connection/DBconnection')
const router = require('./routes/apiRouter')
const cors = require('cors')

const app = express()
const port = 8500



DBconnection()
    .then(() => console.log("Database Connected.."))
    .catch((err) => console.log(err))

app.use(cors());
app.use(express.json())


app.use('/', router)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))