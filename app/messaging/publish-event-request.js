const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const publishEventRequest = async (eventMessage, config) => {
  const eventSender = new MessageSender(config)
  const message = createMessage(eventMessage, 'uk.gov.pay.event.publisher')
  await eventSender.sendMessage(message)
}

module.exports = publishEventRequest
