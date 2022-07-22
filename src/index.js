const { port } = require('./config/vars')
require('express-async-errors')

const app = require('./config/express')

app.listen(port || 3030, () => console.log('server started on port ', port || 3030))
