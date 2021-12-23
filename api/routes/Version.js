'use strict'

import { VersionRouter } from '../resources/Version'
import { expressUtils } from '../helpers'

const config = {
  routesConfig: {
    get: { enabled: true }
  }
}

const versionRouter = new VersionRouter(expressUtils, config)

export default versionRouter
