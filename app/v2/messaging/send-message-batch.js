const { MessageBatchSender } = require('ffc-messaging')
const { createMessage } = require('./create-message')

const sendMessageBatch = async (events, config) => {
  const messages = events.map(createMessage)
  const eventSender = new MessageBatchSender(config)
  await eventSender.sendBatchMessages(messages)
  await eventSender.closeConnection()
}

module.exports = {
  sendMessageBatch
}
