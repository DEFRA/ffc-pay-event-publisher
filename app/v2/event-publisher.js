const { validateEvent } = require('./validate-event')
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
    console.log('Received events:')
    console.log(events)
    const validEvents = events.filter(validateEvent)
    console.log('Valid events:')
    console.log(validEvents)
    await sendMessageBatch(validEvents, this.config)
  }
}

module.exports = {
  EventPublisher
}
