const { EventPublisher } = require('../../../../app/v2/event-publisher/event-publisher')

jest.mock('../../../../app/v2/event-publisher/validate-event')
jest.mock('../../../../app/v2/messaging')

const { validateEvent } = require('../../../../app/v2/event-publisher/validate-event')
const { sendMessage, sendMessageBatch } = require('../../../../app/v2/messaging')

describe('EventPublisher', () => {
  let config
  let instance

  beforeEach(() => {
    config = { connection: 'test' }
    instance = new EventPublisher(config)
    jest.clearAllMocks()
  })

  test('constructor should set config', () => {
    expect(instance.config).toBe(config)
  })

  test('publishEvent should call validateEvent and sendMessage for valid event', async () => {
    const event = { type: 'create', source: 'system' }
    validateEvent.mockReturnValue(true)
    sendMessage.mockResolvedValue()

    await instance.publishEvent(event)

    expect(validateEvent).toHaveBeenCalledWith(event)
    expect(sendMessage).toHaveBeenCalledWith(event, config)
  })

  test('publishEvent should not call sendMessage for invalid event', async () => {
    const event = { source: 'system' }
    validateEvent.mockReturnValue(false)

    await instance.publishEvent(event)

    expect(validateEvent).toHaveBeenCalledWith(event)
    expect(sendMessage).not.toHaveBeenCalled()
  })

  test('publishEvents should filter valid events and call sendMessageBatch', async () => {
    const events = [
      { type: 'create', source: 'system' },
      { source: 'system' }, // invalid
      { type: 'update', source: 'api' }
    ]
    validateEvent.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce(true)
    sendMessageBatch.mockResolvedValue()

    await instance.publishEvents(events)

    expect(validateEvent).toHaveBeenCalledTimes(3)
    expect(sendMessageBatch).toHaveBeenCalledWith([events[0], events[2]], config)
  })
})
