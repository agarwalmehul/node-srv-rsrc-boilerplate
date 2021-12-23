'use strict'

import _ from 'lodash'

export default function configureRouter (Router, masterConfig, customConfig) {
  const config = _.merge(masterConfig, customConfig)

  const {
    preMiddlewares = [],
    postMiddlewares = []
  } = config

  // Pre-route Middlewares
  preMiddlewares.forEach(middleware => {
    Router.use(middleware)
  })

  // Resource Route Building
  buildRoutes(Router, config)

  // Post-route Middlewares
  postMiddlewares.forEach(middleware => {
    Router.use(middleware)
  })

  return Router
}

function buildRoutes (Router, config) {
  const { routesConfig } = config
  const routes = _.keys(routesConfig)

  routes.forEach(route => {
    const routeConfig = routesConfig[route]
    const { method, path, pipeline = [], enabled = false } = routeConfig

    if (enabled) {
      Router[method](path, ...pipeline)
    }
  })
}
