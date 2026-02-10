const trackEvents = require('../../../../app/v1/app-insights/track-events')

describe('trackEvents', () => {
  let mockAppInsights
  let mockDefaultClient

  beforeEach(() => {
    mockDefaultClient = {
      trackEvent: jest.fn(),
    }
    mockAppInsights = {
      defaultClient: mockDefaultClient,
    }
  })

  test('should not call trackEvent when appInsights is undefined', () => {
    trackEvents(undefined, ['message1', 'message2'])
    expect(mockDefaultClient.trackEvent).not.toHaveBeenCalled()
  })

  test('should not call trackEvent when appInsights.defaultClient is undefined', () => {
    mockAppInsights.defaultClient = undefined
    trackEvents(mockAppInsights, ['message1', 'message2'])
    expect(mockDefaultClient.trackEvent).not.toHaveBeenCalled()
  })

  test('should call trackEvent for each eventMessage when both appInsights and defaultClient are defined', () => {
    const eventMessages = ['message1', 'message2', 'message3']
    trackEvents(mockAppInsights, eventMessages)
    expect(mockDefaultClient.trackEvent).toHaveBeenCalledTimes(3)
    expect(mockDefaultClient.trackEvent).toHaveBeenNthCalledWith(1, 'message1')
    expect(mockDefaultClient.trackEvent).toHaveBeenNthCalledWith(2, 'message2')
    expect(mockDefaultClient.trackEvent).toHaveBeenNthCalledWith(3, 'message3')
  })
})
