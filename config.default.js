module.exports = {
  mongo: {
    // see <http://sierrasoftworks.github.io/Iridium/interfaces/configuration.html>
    database: 'leo-fight',
    host: 'localhost',
    port: 27017
  },
  uc: {
    url: 'http://127.0.0.1:3000'
  },
  httpServer: {
    host: '127.0.0.1',
    port: 3010,
    allowOrigins: [
      /^https?:\/\/localhost:\d+$/
    ]
  },
  realtimeServer: {
    host: '127.0.0.1',
    port: 3011,
    publicUrl: 'http://localhost:3011/realtime'
  },
  secret: {
    session: 'You!MUST!ChangeThis',
    room: 'MUST!ChangeThisOne,too'
  },
  arena: {
    server: 'ws://localhost:4000'
  }
}
