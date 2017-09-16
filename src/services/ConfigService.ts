import * as fs from 'fs'
import * as path from 'path'
import { Container, Inject, Service } from 'typedi'

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
      room: string
    }
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
        return
      }
    }
    process.exit(1)
  }
}
