const { sendMessage } = require('../../../../app/v2/messaging/send-message')

jest.mock('../../../../app/messaging/service-bus')
jest.mock('../../../../app/v2/messaging/create-message')

const { getSender, sendMessage: sendServiceBusMessage } = require('../../../../app/messaging/service-bus')
const { createMessage } = require('../../../../app/v2/messaging/create-message')

describe('sendMessage', () => {
  let mockSender
  let config
  let event

  beforeEach(() => {
    config = { connectionString: 'test' }
    event = { type: 'create', source: 'system' }
    mockSender = { name: 'sender' }
    getSender.mockReturnValue(mockSender)
    sendServiceBusMessage.mockResolvedValue()
    createMessage.mockReturnValue({ body: 'mocked', type: 'create', source: 'system' })
  })

  test('should get cached sender, create message, and send', async () => {
    await sendMessage(event, config)

    expect(createMessage).toHaveBeenCalledWith(event)
    expect(getSender).toHaveBeenCalledWith(config)
    expect(sendServiceBusMessage).toHaveBeenCalledWith(mockSender, { body: 'mocked', type: 'create', source: 'system' })
  })
})
