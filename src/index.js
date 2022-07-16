require('express-async-errors')

const app = require('./config/express')

app.listen(3030, () => console.log('server started on port 3030'))
