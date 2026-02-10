const publishEventRequest = require('../../../../app/v1/messaging/publish-event-request')

jest.mock('ffc-messaging')
jest.mock('../../../../app/v1/messaging/create-message')

const { MessageSender } = require('ffc-messaging')
const createMessage = require('../../../../app/v1/messaging/create-message')

describe('publishEventRequest', () => {
  let mockEventSender
  let mockCreateMessage
  let config
  let eventMessage

  beforeEach(() => {
    config = { connectionString: 'test' }
    eventMessage = {
      properties: {
        action: { type: 'create' },
        checkpoint: 'start'
      }
    }
    mockEventSender = {
      sendMessage: jest.fn().mockResolvedValue(),
      closeConnection: jest.fn().mockResolvedValue()
    }
    MessageSender.mockImplementation(() => mockEventSender)
    mockCreateMessage = jest.fn().mockReturnValue({ message: 'mocked' })
    createMessage.mockImplementation(mockCreateMessage)

    // Mock Date
    const mockDate = new Date('2023-01-01T00:00:00.000Z')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    global.Date.prototype.toISOString = jest.fn(() => '2023-01-01T00:00:00.000Z')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should create MessageSender, modify eventMessage, create message, send, and close', async () => {
    await publishEventRequest(eventMessage, config)

    expect(MessageSender).toHaveBeenCalledWith(config)
    expect(eventMessage.properties.action.timestamp).toBe('2023-01-01T00:00:00.000Z')
    expect(createMessage).toHaveBeenCalledWith(eventMessage, 'create', 'start')
    expect(mockEventSender.sendMessage).toHaveBeenCalledWith({ message: 'mocked' })
    expect(mockEventSender.closeConnection).toHaveBeenCalled()
  })
})
