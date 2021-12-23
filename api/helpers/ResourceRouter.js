'use strict'

import _ from 'lodash'

class ResourceRouter {
  constructor (resourceRouter, masterConfig, routesConfig) {
    const {
      preMiddlewares = [],
      postMiddlewares = []
    } = masterConfig

    // Pre-route Middlewares
    preMiddlewares.forEach(middleware => {
      resourceRouter.use(middleware)
    })

    // Resource Route Building
    buildRoutes(masterConfig, routesConfig, resourceRouter)

    // Post-route Middlewares
    postMiddlewares.forEach(middleware => {
      resourceRouter.use(middleware)
    })

    return resourceRouter
  }
}

export default ResourceRouter

function buildRoutes (masterConfig, routesConfig, Router) {
  const { routesConfig: masterRoutesConfig = {} } = masterConfig
  const routes = _.keys(masterRoutesConfig)

  routes.forEach(route => {
    const masterConfig = masterRoutesConfig[route]
    const customConfig = routesConfig[route] || {}

    const { method, path, pipeline = [] } = masterConfig
    const { enabled = false } = customConfig

    if (enabled) {
      Router[method](path, ...pipeline)
    }
  })
}
