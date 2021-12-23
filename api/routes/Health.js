'use strict'

import { HealthRouter } from '../resources/Health'

const routeConfig = {
  get: { enabled: true }
}

const healthRouter = new HealthRouter(routeConfig)

export default healthRouter
