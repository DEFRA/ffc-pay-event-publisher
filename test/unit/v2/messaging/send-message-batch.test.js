const { sendMessageBatch } = require('../../../../app/v2/messaging/send-message-batch')

jest.mock('ffc-messaging')
jest.mock('../../../../app/v2/messaging/create-message')

const { MessageBatchSender } = require('ffc-messaging')
const { createMessage } = require('../../../../app/v2/messaging/create-message')

describe('sendMessageBatch', () => {
  let mockEventSender
  let config
  let events

  beforeEach(() => {
    jest.clearAllMocks()
    config = { connectionString: 'test' }
    events = [
      { type: 'create', source: 'system' },
      { type: 'update', source: 'api' }
    ]
    mockEventSender = {
      sendBatchMessages: jest.fn().mockResolvedValue(),
      closeConnection: jest.fn().mockResolvedValue()
    }
    MessageBatchSender.mockImplementation(() => mockEventSender)
    createMessage
      .mockReturnValueOnce({ body: 'mocked1', type: 'create', source: 'system' })
      .mockReturnValueOnce({ body: 'mocked2', type: 'update', source: 'api' })
  })

  test('should create MessageBatchSender, create messages, send batch, and close', async () => {
    await sendMessageBatch(events, config)

    expect(createMessage).toHaveBeenCalledTimes(2)
    expect(createMessage).toHaveBeenNthCalledWith(1, events[0], 0, events)
    expect(createMessage).toHaveBeenNthCalledWith(2, events[1], 1, events)
    expect(MessageBatchSender).toHaveBeenCalledWith(config)
    expect(mockEventSender.sendBatchMessages).toHaveBeenCalledWith([
      { body: 'mocked1', type: 'create', source: 'system' },
      { body: 'mocked2', type: 'update', source: 'api' }
    ])
    expect(mockEventSender.closeConnection).toHaveBeenCalled()
  })
})
