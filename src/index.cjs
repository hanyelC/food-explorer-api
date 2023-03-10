require('express-async-errors')

import('./config/express.js').then(({ app }) => {
  import('./config/vars.js').then(({ port }) => {
    app.listen(port || 3030, () =>
      console.log('server started on port ', port || 3030)
    )
  })
})
