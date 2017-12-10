import { Container, Service } from 'typedi'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  useContainer
} from 'typeorm'
import { ConfigService } from '../services/ConfigService'

@Service()
export class DbConnectionManager {
  private options: ConnectionOptions
  constructor(cfg: ConfigService) {
    useContainer(Container)
    this.options = cfg.config.dbConnection
  }

  public connect(): Promise<Connection> {
    return createConnection(this.options)
  }
}
