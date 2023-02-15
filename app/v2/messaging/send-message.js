const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendMessage = async (event, config) => {
  const message = createMessage(event)
  const eventSender = new MessageSender(config)
  await eventSender.sendMessage(message)
  await eventSender.closeConnection()
}

module.exports = sendMessage
