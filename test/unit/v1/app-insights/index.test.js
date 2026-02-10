const appInsights = require('../../../../app/v1/app-insights')
const trackEvent = require('../../../../app/v1/app-insights/track-event')
const trackEvents = require('../../../../app/v1/app-insights/track-events')

describe('app/v1/app-insights/index', () => {
  test('should export trackEvent as a function', () => {
    expect(typeof appInsights.trackEvent).toBe('function')
    expect(appInsights.trackEvent).toBe(trackEvent)
  })

  test('should export trackEvents as a function', () => {
    expect(typeof appInsights.trackEvents).toBe('function')
    expect(appInsights.trackEvents).toBe(trackEvents)
  })
})
