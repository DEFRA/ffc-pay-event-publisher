const publishEventBatchRequest = require('../../../../app/v1/messaging/publish-event-batch-request')

jest.mock('ffc-messaging')
jest.mock('../../../../app/v1/messaging/create-message')

const { MessageBatchSender } = require('ffc-messaging')
const createMessage = require('../../../../app/v1/messaging/create-message')

describe('publishEventBatchRequest', () => {
  let mockEventSender
  let config
  let eventMessages

  beforeEach(() => {
    config = { connectionString: 'test' }
    eventMessages = [
      {
        properties: {
          action: { type: 'create' },
          checkpoint: 'start'
        }
      },
      {
        properties: {
          action: { type: 'update' },
          checkpoint: 'end'
        }
      }
    ]
    mockEventSender = {
      sendBatchMessages: jest.fn().mockResolvedValue(),
      closeConnection: jest.fn().mockResolvedValue()
    }
    MessageBatchSender.mockImplementation(() => mockEventSender)
    createMessage.mockImplementation((msg, type, source) => ({ body: msg, type, source }))

    // Mock Date
    const mockDate = new Date('2023-01-01T00:00:00.000Z')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    global.Date.prototype.toISOString = jest.fn(() => '2023-01-01T00:00:00.000Z')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should create MessageBatchSender, modify eventMessages, create messages, send batch, and close', async () => {
    await publishEventBatchRequest(eventMessages, config)

    expect(MessageBatchSender).toHaveBeenCalledWith(config)
    expect(eventMessages[0].properties.action.timestamp).toBe('2023-01-01T00:00:00.000Z')
    expect(eventMessages[1].properties.action.timestamp).toBe('2023-01-01T00:00:00.000Z')
    expect(createMessage).toHaveBeenCalledTimes(2)
    expect(createMessage).toHaveBeenNthCalledWith(1, eventMessages[0], 'create', 'start')
    expect(createMessage).toHaveBeenNthCalledWith(2, eventMessages[1], 'update', 'end')
    expect(mockEventSender.sendBatchMessages).toHaveBeenCalledWith([
      { body: eventMessages[0], type: 'create', source: 'start' },
      { body: eventMessages[1], type: 'update', source: 'end' }
    ])
    expect(mockEventSender.closeConnection).toHaveBeenCalled()
  })
})
