import 'es6-shim'
import 'reflect-metadata'

import { Container } from 'typedi'
import * as log from 'winston'
import { HttpServer } from './servers/HttpServer'

const server = Container.get(HttpServer)
server
  .listen()
  .then(address => {
    log.info(`HttpServer listened on http://${address}`)
  })
  .catch(err => {
    log.error(err)
  })
