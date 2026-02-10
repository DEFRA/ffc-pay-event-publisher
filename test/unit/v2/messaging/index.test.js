const messaging = require('../../../../app/v2/messaging')
const { sendMessage } = require('../../../../app/v2/messaging/send-message')
const { sendMessageBatch } = require('../../../../app/v2/messaging/send-message-batch')

describe('app/v2/messaging/index', () => {
  test('should export sendMessage as a function', () => {
    expect(typeof messaging.sendMessage).toBe('function')
    expect(messaging.sendMessage).toBe(sendMessage)
  })

  test('should export sendMessageBatch as a function', () => {
    expect(typeof messaging.sendMessageBatch).toBe('function')
    expect(messaging.sendMessageBatch).toBe(sendMessageBatch)
  })
})
