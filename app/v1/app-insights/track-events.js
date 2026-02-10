const trackEvent = require('./track-event')

const trackEvents = (appInsights, eventMessages) => {
  eventMessages.forEach(eventMessage => {
    trackEvent(appInsights, eventMessage)
  })
}
module.exports = trackEvents
