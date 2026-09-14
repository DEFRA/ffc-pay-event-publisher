const { getSender, sendBatchMessages } = require('../../messaging/service-bus')
const { createMessage } = require('./create-message')

const sendMessageBatch = async (events, config) => {
  const messages = events.map(createMessage)
  const sender = getSender(config)
  await sendBatchMessages(sender, messages)
}

module.exports = {
  sendMessageBatch
}
