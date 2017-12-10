import * as fs from 'fs'
import * as path from 'path'
import { Container, Inject, Service } from 'typedi'
import { ConnectionOptions } from 'typeorm'

@Service()
export class ConfigService {
  public config: {
    httpServer: {
      host: string
      port: number
      allowOrigins: RegExp[]
    }
    secret: {
      session: string
    }
    dbConnection: ConnectionOptions
  }

  constructor() {
    const configFiles = [
      process.env.LEOFIGHT_CONFIG,
      path.join(process.cwd(), 'config.js'),
      path.join(process.cwd(), 'config.default.js'),
      path.join(__dirname, '..', 'config.js'),
      path.join(__dirname, '..', 'config.default.js'),
      path.join(__dirname, '..', '..', 'config.js'),
      path.join(__dirname, '..', '..', 'config.default.js')
    ]
    for (const file of configFiles) {
      if (fs.existsSync(file)) {
        this.config = require(file)
        this.transformConfig()
        return
      }
    }
    process.exit(1)
  }

  private transformConfig() {
    const entities = ['src/entities/*.ts', 'src/entities/*.js']
    let dbConnection: any = this.config.dbConnection
    if (dbConnection instanceof Array) {
      dbConnection = dbConnection.map(opt => {
        opt.entities = entities
        return opt
      })
    } else {
      dbConnection.entities = entities
    }
    dbConnection.cli = dbConnection.cli || {}
    dbConnection.cli.entitiesDir = 'src/entities'
    dbConnection.cli.migrationsDir = 'src/migrations'
    this.config.dbConnection = dbConnection
  }
}
