const messageSchema = require('./event-schema')

class PublishEvent {
  async sendEvent (jsonMessage) {
    console.log('Event sent:', jsonMessage)
  }
}

module.exports = PublishEvent