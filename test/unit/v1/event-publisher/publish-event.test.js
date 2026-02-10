const PublishEvent = require('../../../../app/v1/event-publisher/publish-event')

jest.mock('../../../../app/v1/event-publisher/event-schema')
jest.mock('../../../../app/v1/app-insights')
jest.mock('../../../../app/v1/messaging')

const validateEvent = require('../../../../app/v1/event-publisher/event-schema')
const { trackEvent } = require('../../../../app/v1/app-insights')
const { publishEventRequest } = require('../../../../app/v1/messaging')

describe('PublishEvent', () => {
  let config
  let instance

  beforeEach(() => {
    config = { appInsights: {}, otherConfig: 'value' }
    instance = new PublishEvent(config)
    jest.clearAllMocks()
  })

  test('constructor should set appInsights and config', () => {
    expect(instance.appInsights).toBe(config.appInsights)
    expect(instance.config).toBe(config)
  })

  test('sendEvent should call validateEvent, publishEventRequest, and trackEvent for valid event', async () => {
    const eventMessage = { name: 'test', properties: {} }
    validateEvent.mockReturnValue(true)
    publishEventRequest.mockResolvedValue()
    trackEvent.mockImplementation()

    await instance.sendEvent(eventMessage)

    expect(validateEvent).toHaveBeenCalledWith(eventMessage)
    expect(publishEventRequest).toHaveBeenCalledWith(eventMessage, config)
    expect(trackEvent).toHaveBeenCalledWith(config.appInsights, eventMessage)
  })

  test('sendEvent should not call publishEventRequest or trackEvent for invalid event', async () => {
    const eventMessage = { invalid: true }
    validateEvent.mockReturnValue(false)

    await instance.sendEvent(eventMessage)

    expect(validateEvent).toHaveBeenCalledWith(eventMessage)
    expect(publishEventRequest).not.toHaveBeenCalled()
    expect(trackEvent).not.toHaveBeenCalled()
  })
})
