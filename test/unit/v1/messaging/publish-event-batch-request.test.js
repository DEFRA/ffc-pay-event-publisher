const publishEventBatchRequest = require('../../../../app/v1/messaging/publish-event-batch-request')

jest.mock('../../../../app/messaging/service-bus')
jest.mock('../../../../app/v1/messaging/create-message')

const { getSender, sendBatchMessages } = require('../../../../app/messaging/service-bus')
const createMessage = require('../../../../app/v1/messaging/create-message')

describe('publishEventBatchRequest', () => {
  let mockSender
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
    mockSender = { name: 'sender' }
    getSender.mockReturnValue(mockSender)
    sendBatchMessages.mockResolvedValue()
    createMessage.mockImplementation((msg, type, source) => ({ body: msg, type, source }))

    // Mock Date
    const mockDate = new Date('2023-01-01T00:00:00.000Z')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    global.Date.prototype.toISOString = jest.fn(() => '2023-01-01T00:00:00.000Z')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should get cached sender, modify eventMessages, create messages, and send batch', async () => {
    await publishEventBatchRequest(eventMessages, config)

    expect(getSender).toHaveBeenCalledWith(config)
    expect(eventMessages[0].properties.action.timestamp).toBe('2023-01-01T00:00:00.000Z')
    expect(eventMessages[1].properties.action.timestamp).toBe('2023-01-01T00:00:00.000Z')
    expect(createMessage).toHaveBeenCalledTimes(2)
    expect(createMessage).toHaveBeenNthCalledWith(1, eventMessages[0], 'create', 'start')
    expect(createMessage).toHaveBeenNthCalledWith(2, eventMessages[1], 'update', 'end')
    expect(sendBatchMessages).toHaveBeenCalledWith(mockSender, [
      { body: eventMessages[0], type: 'create', source: 'start' },
      { body: eventMessages[1], type: 'update', source: 'end' }
    ])
  })
})
