module.exports = {
  httpServer: {
    host: '127.0.0.1',
    port: 3010,
    allowOrigins: [
      /^https?:\/\/localhost:\d+$/
    ]
  },
  secret: {
    session: 'You!MUST!ChangeThis'
  },
  dbConnection: {
    type: 'sqlite',
    database: 'data/demo.db'
  }
}
