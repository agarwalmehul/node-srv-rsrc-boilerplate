'use strict'

import { Router } from 'express'
import { expressUtils, ResourceRouter } from '../../helpers'
import VersionController from './Version.Controller'

const { get } = VersionController

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

class VersionRouter extends ResourceRouter {
  constructor (routeConfig) {
    const resourceRouter = new Router()
    const versionRouter = super(resourceRouter, masterConfig, routeConfig)
    return versionRouter
  }
}

export default VersionRouter
