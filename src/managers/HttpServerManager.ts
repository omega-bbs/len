import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import * as morgan from 'morgan'
import * as path from 'path'
import { useContainer, useExpressServer } from 'routing-controllers'
import { Container, Inject, Service } from 'typedi'
import { ConfigService } from '../services/ConfigService'
import { GraphqlService } from '../services/GraphqlService'

@Service()
export class HttpServerManager {
  public app: express.Application
  private config: any

  constructor(cfg: ConfigService, gql: GraphqlService) {
    this.config = cfg.config.httpServer
    this.app = express()
    this.app.use(morgan('combined'))
    this.app.use(
      require('cookie-session')({
        name: 's',
        keys: [cfg.config.secret.session],
        maxAge: 15 * 24 * 60 * 60 * 1000
      })
    )
    this.app.use(
      '/graphql',
      graphqlHTTP({
        schema: gql.schema,
        rootValue: gql.root,
        graphiql: true
      })
    )
    useContainer(Container)
    useExpressServer(this.app, {
      controllers: [path.join(__dirname, '..', '/controllers/*Controller.*')],
      middlewares: [path.join(__dirname, '..', '/middlewares/*Middleware.*')],
      interceptors: [path.join(__dirname, '', '/interceptor/*Interceptor.*')]
    })
  }

  public listen(): Promise<string> {
    const config = this.config
    return new Promise<string>((resolve, reject) => {
      try {
        this.app.listen(config.port, config.host, () => {
          resolve(`${config.host}:${config.port}`)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
