const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const publishEventRequest = async (eventMessage, config, type) => {
  eventMessage.properties.action.timestamp = new Date()
  const eventSender = new MessageSender(config)
  const messageType = eventMessage.properties.action.type
  const source = eventMessage.properties.checkpoint
  const message = createMessage(eventMessage, messageType, source)
  await eventSender.sendMessage(message)
}

module.exports = publishEventRequest
