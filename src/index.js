require('dotenv').config()
require('express-async-errors')

const app = require('./config/express')

app.listen(process.env.PORT || 3030, () => console.log('server started on port ', process.env.PORT || 3030))
