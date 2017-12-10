import * as fs from 'fs'
import * as glob from 'glob'
import { buildSchema } from 'graphql'
import * as path from 'path'
import { Service } from 'typedi'
import * as rootResolver from '../resolvers/root'

@Service()
export class GraphqlService {
  public schema: any
  public root: any
  private schemaFile: string
  constructor() {
    this.schemaFile = require.resolve('@omega-bbs/spec/schema.graphql')
    this.schema = this.buildSchema()
    this.root = rootResolver
  }
  private buildSchema() {
    const buf = fs.readFileSync(this.schemaFile)
    const schemaStr = buf.toString()
    return buildSchema(schemaStr)
  }
}
