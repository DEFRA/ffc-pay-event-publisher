const { MessageBatchSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendMessageBatch = async (event, config) => {
  const messages = event.map(createMessage)
  const eventSender = new MessageBatchSender(config)
  await eventSender.sendBatchMessages(messages)
  await eventSender.closeConnection()
}

module.exports = sendMessageBatch
