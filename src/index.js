import { port } from './config/vars.js'
import 'express-async-errors'

import { app } from './config/express.js'

app.listen(port || 3030, () => console.log('server started on port ', port || 3030))
