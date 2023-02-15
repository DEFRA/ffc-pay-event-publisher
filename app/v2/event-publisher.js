const validateEvent = require('./validate-event')
const { sendMessage, sendMessageBatch } = require('./messaging')

class EventPublisher {
  constructor (config) {
    this.config = config
  }

  async publishEvent (event) {
    if (validateEvent(event)) {
      await sendMessage(event, this.config)
    }
  }

  async publishEvents (events) {
    const validEvents = events.filter(validateEvent)
    await sendMessageBatch(validEvents, this.config)
  }
}

module.exports = {
  EventPublisher
}
