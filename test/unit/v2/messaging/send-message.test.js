const { sendMessage } = require('../../../../app/v2/messaging/send-message')

jest.mock('ffc-messaging')
jest.mock('../../../../app/v2/messaging/create-message')

const { MessageSender } = require('ffc-messaging')
const { createMessage } = require('../../../../app/v2/messaging/create-message')

describe('sendMessage', () => {
  let mockEventSender
  let config
  let event

  beforeEach(() => {
    config = { connectionString: 'test' }
    event = { type: 'create', source: 'system' }
    mockEventSender = {
      sendMessage: jest.fn().mockResolvedValue(),
      closeConnection: jest.fn().mockResolvedValue()
    }
    MessageSender.mockImplementation(() => mockEventSender)
    createMessage.mockReturnValue({ body: 'mocked', type: 'create', source: 'system' })
  })

  test('should create MessageSender, create message, send, and close', async () => {
    await sendMessage(event, config)

    expect(createMessage).toHaveBeenCalledWith(event)
    expect(MessageSender).toHaveBeenCalledWith(config)
    expect(mockEventSender.sendMessage).toHaveBeenCalledWith({ body: 'mocked', type: 'create', source: 'system' })
    expect(mockEventSender.closeConnection).toHaveBeenCalled()
  })
})
