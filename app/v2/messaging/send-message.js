const { getSender, sendMessage: sendServiceBusMessage } = require('../../messaging/service-bus')
const { createMessage } = require('./create-message')

const sendMessage = async (event, config) => {
  const message = createMessage(event)
  const sender = getSender(config)
  await sendServiceBusMessage(sender, message)
}

module.exports = {
  sendMessage
}
