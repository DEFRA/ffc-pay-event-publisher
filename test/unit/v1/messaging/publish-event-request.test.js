const publishEventRequest = require('../../../../app/v1/messaging/publish-event-request')

jest.mock('../../../../app/messaging/service-bus')
jest.mock('../../../../app/v1/messaging/create-message')

const { getSender, sendMessage: sendServiceBusMessage } = require('../../../../app/messaging/service-bus')
const createMessage = require('../../../../app/v1/messaging/create-message')

describe('publishEventRequest', () => {
  let mockSender
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
    mockSender = { name: 'sender' }
    getSender.mockReturnValue(mockSender)
    sendServiceBusMessage.mockResolvedValue()
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

  test('should get cached sender, modify eventMessage, create message, and send', async () => {
    await publishEventRequest(eventMessage, config)

    expect(getSender).toHaveBeenCalledWith(config)
    expect(eventMessage.properties.action.timestamp).toBe('2023-01-01T00:00:00.000Z')
    expect(createMessage).toHaveBeenCalledWith(eventMessage, 'create', 'start')
    expect(sendServiceBusMessage).toHaveBeenCalledWith(mockSender, { message: 'mocked' })
  })
})
