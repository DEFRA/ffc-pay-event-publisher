const { getSender, sendMessage: sendServiceBusMessage } = require('../../messaging/service-bus')
const createMessage = require('./create-message')

const publishEventRequest = async (eventMessage, config) => {
  const messageType = eventMessage.properties.action.type
  const source = eventMessage.properties.checkpoint
  eventMessage.properties.action.timestamp = new Date().toISOString()
  const message = createMessage(eventMessage, messageType, source)
  const sender = getSender(config)
  await sendServiceBusMessage(sender, message)
}

module.exports = publishEventRequest
