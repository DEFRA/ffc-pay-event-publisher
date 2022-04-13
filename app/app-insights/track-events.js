const trackEvent = require('./track-event')

module.exports = (appInsights, eventMessages) => {
  eventMessages.forEach(eventMessage => {
    trackEvent(appInsights, eventMessage)
  })
}
