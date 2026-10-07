const { sendMessageBatch } = require('../../../../app/v2/messaging/send-message-batch')

jest.mock('../../../../app/messaging/service-bus')
jest.mock('../../../../app/v2/messaging/create-message')

const { getSender, sendBatchMessages } = require('../../../../app/messaging/service-bus')
const { createMessage } = require('../../../../app/v2/messaging/create-message')

describe('sendMessageBatch', () => {
  let mockSender
  let config
  let events

  beforeEach(() => {
    jest.clearAllMocks()
    config = { connectionString: 'test' }
    events = [
      { type: 'create', source: 'system' },
      { type: 'update', source: 'api' }
    ]
    mockSender = { name: 'sender' }
    getSender.mockReturnValue(mockSender)
    sendBatchMessages.mockResolvedValue()
    createMessage
      .mockReturnValueOnce({ body: 'mocked1', type: 'create', source: 'system' })
      .mockReturnValueOnce({ body: 'mocked2', type: 'update', source: 'api' })
  })

  test('should get cached sender, create messages, and send batch', async () => {
    await sendMessageBatch(events, config)

    expect(createMessage).toHaveBeenCalledTimes(2)
    expect(createMessage).toHaveBeenNthCalledWith(1, events[0], 0, events)
    expect(createMessage).toHaveBeenNthCalledWith(2, events[1], 1, events)
    expect(getSender).toHaveBeenCalledWith(config)
    expect(sendBatchMessages).toHaveBeenCalledWith(mockSender, [
      { body: 'mocked1', type: 'create', source: 'system' },
      { body: 'mocked2', type: 'update', source: 'api' }
    ])
  })
})
