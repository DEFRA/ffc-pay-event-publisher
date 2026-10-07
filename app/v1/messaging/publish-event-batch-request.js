const { getSender, sendBatchMessages } = require('../../messaging/service-bus')
const createMessage = require('./create-message')

const publishEventBatchRequest = async (eventMessages, config) => {
  const messages = eventMessages.map(message => {
    message.properties.action.timestamp = new Date().toISOString()
    return createMessage(message, message.properties.action.type, message.properties.checkpoint)
  })
  const sender = getSender(config)
  await sendBatchMessages(sender, messages)
}

module.exports = publishEventBatchRequest
