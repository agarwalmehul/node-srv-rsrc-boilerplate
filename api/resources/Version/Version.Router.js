'use strict'

import { configureRouter } from '../../helpers'
import VersionController from './Version.Controller'

const { get } = VersionController

const { expressUtils } = global

const { reqHandler, resHandler, authenticator, crypto } = expressUtils
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler
const { setHeaders } = resHandler
const { validateToken, validateApiKey } = authenticator
const { encryptPayload, decryptPayload } = crypto

const masterConfig = {
  preMiddlewares: [
    extractHeaders
    // validateApiKey,
    // validateToken,
    // decryptPayload
  ],

  postMiddlewares: [
    // encryptPayload,
    setHeaders
  ],

  routesConfig: {
    get: {
      method: 'get',
      path: '/',
      pipeline: [routeSanity, asyncWrapper(get)]
    }
  }
}

class VersionRouter {
  constructor (Router, customConfig) {
    const resourceRouter = configureRouter(Router, masterConfig, customConfig)
    return resourceRouter
  }
}

export default VersionRouter
