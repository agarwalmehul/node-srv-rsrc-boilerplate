'use strict'

import { VersionRouter } from '../resources/Version'

const routeConfig = {
  get: { enabled: true }
}

const versionRouter = new VersionRouter(routeConfig)

export default versionRouter
