import 'es6-shim'
import 'reflect-metadata'

import { Container } from 'typedi'
import * as log from 'winston'
import { HttpServerManager } from './managers/HttpServerManager'

const server = Container.get(HttpServerManager)
server
  .listen()
  .then(address => {
    log.info(`HttpServer listened on http://${address}`)
  })
  .catch(err => {
    log.error(err)
  })
