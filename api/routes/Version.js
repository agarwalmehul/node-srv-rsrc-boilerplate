'use strict'

import Express from 'express'
import { VersionRouter } from '../resources/Version'

const config = {
  routesConfig: {
    get: { enabled: true }
  }
}

const Router = new Express.Router()
const versionRouter = new VersionRouter(Router, config)

export default versionRouter
