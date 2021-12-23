'use strict'

import { HealthRouter } from '../resources/Health'
import { expressUtils } from '../helpers'

const config = {
  routesConfig: {
    get: { enabled: true }
  }
}

const healthRouter = new HealthRouter(expressUtils, config)

export default healthRouter
