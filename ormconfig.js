/**
 * Provide TypeORM Config
 * @file
 */

require('reflect-metadata')
require('ts-node/register')

const Container = require('typedi').Container
const ConfigService = require('./src/services/ConfigService').ConfigService

const configService = Container.get(ConfigService)

module.exports = configService.config.dbConnection
