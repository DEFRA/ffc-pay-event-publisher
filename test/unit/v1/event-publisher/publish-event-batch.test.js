const PublishEventBatch = require('../../../../app/v1/event-publisher/publish-event-batch')

jest.mock('../../../../app/v1/event-publisher/event-schema')
jest.mock('../../../../app/v1/app-insights')
jest.mock('../../../../app/v1/messaging')

const validateEvent = require('../../../../app/v1/event-publisher/event-schema')
const { trackEvents } = require('../../../../app/v1/app-insights')
const { publishEventBatchRequest } = require('../../../../app/v1/messaging')

describe('PublishEventBatch', () => {
  let config
  let instance

  beforeEach(() => {
    config = { appInsights: {}, otherConfig: 'value' }
    instance = new PublishEventBatch(config)
    jest.clearAllMocks()
  })

  test('constructor should set appInsights and config', () => {
    expect(instance.appInsights).toBe(config.appInsights)
    expect(instance.config).toBe(config)
  })

  test('sendEvents should call validateEvent for each, publishEventBatchRequest, and trackEvents for all valid events', async () => {
    const eventMessages = [
      { name: 'test1', properties: {} },
      { name: 'test2', properties: {} }
    ]
    validateEvent.mockReturnValue(true)
    publishEventBatchRequest.mockResolvedValue()
    trackEvents.mockImplementation()

    await instance.sendEvents(eventMessages)

    expect(validateEvent).toHaveBeenCalledTimes(2)
    expect(validateEvent).toHaveBeenNthCalledWith(1, eventMessages[0])
    expect(validateEvent).toHaveBeenNthCalledWith(2, eventMessages[1])
    expect(publishEventBatchRequest).toHaveBeenCalledWith(eventMessages, config)
    expect(trackEvents).toHaveBeenCalledWith(config.appInsights, eventMessages)
  })

  test('sendEvents should not call publishEventBatchRequest or trackEvents if any event is invalid', async () => {
    const eventMessages = [
      { name: 'test1', properties: {} },
      { invalid: true }
    ]
    validateEvent.mockReturnValueOnce(true).mockReturnValueOnce(false)

    await instance.sendEvents(eventMessages)

    expect(validateEvent).toHaveBeenCalledTimes(2)
    expect(publishEventBatchRequest).not.toHaveBeenCalled()
    expect(trackEvents).not.toHaveBeenCalled()
  })
})
