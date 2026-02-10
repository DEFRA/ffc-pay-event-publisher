const trackEvent = require('../../../../app/v1/app-insights/track-event')

describe('trackEvent', () => {
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
    trackEvent(undefined, 'test message')
    expect(mockDefaultClient.trackEvent).not.toHaveBeenCalled()
  })

  test('should not call trackEvent when appInsights.defaultClient is undefined', () => {
    mockAppInsights.defaultClient = undefined
    trackEvent(mockAppInsights, 'test message')
    expect(mockDefaultClient.trackEvent).not.toHaveBeenCalled()
  })

  test('should call trackEvent with eventMessage when both appInsights and defaultClient are defined', () => {
    trackEvent(mockAppInsights, 'test message')
    expect(mockDefaultClient.trackEvent).toHaveBeenCalledWith('test message')
  })
})
