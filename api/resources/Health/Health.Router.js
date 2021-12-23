'use strict'

import Express from 'express'
import { configureRouter } from '../../helpers'
import HealthController from './Health.Controller'

const { get } = HealthController

class HealthRouter {
  constructor (expressUtils, customConfig) {
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

    const Router = new Express.Router()

    const resourceRouter = configureRouter(Router, masterConfig, customConfig)
    return resourceRouter
  }
}

export default HealthRouter
