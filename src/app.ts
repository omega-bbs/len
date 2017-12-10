import 'es6-shim'
import 'reflect-metadata'

import { Container } from 'typedi'
import * as log from 'winston'
import { DbConnectionManager } from './managers/DbConnectionManager'
import { HttpServerManager } from './managers/HttpServerManager'

const httpServerManager = Container.get(HttpServerManager)
const dbConnectionManger = Container.get(DbConnectionManager)
;(async () => {
  const dc = await dbConnectionManger.connect()
  log.info('Database connected')
  const address = await httpServerManager.listen()
  log.info(`HttpServer listened on http://${address}`)
})().catch(err => {
  log.error(err)
})
