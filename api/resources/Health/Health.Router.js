'use strict'

import { Router } from 'express'
import { expressUtils, ResourceRouter } from '../../helpers'
import HealthController from './Health.Controller'

const { get } = HealthController

const { reqHandler, resHandler, authenticator, crypto } = expressUtils
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler
const { setHeaders } = resHandler
const { validateToken, validateApiKey } = authenticator
const { encryptPayload, decryptPayload } = crypto

const masterConfig = {
  preMiddlewares: [
    extractHeaders,
    validateApiKey,
    validateToken,
    decryptPayload
  ],

  postMiddlewares: [
    encryptPayload,
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

class HealthRouter extends ResourceRouter {
  constructor (routeConfig) {
    const resourceRouter = new Router()
    const healthRouter = super(resourceRouter, masterConfig, routeConfig)
    return healthRouter
  }
}

export default HealthRouter
