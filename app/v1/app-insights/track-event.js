const trackEvent = (appInsights, eventMessage) => {
  if (appInsights !== undefined && appInsights.defaultClient !== undefined) {
    appInsights.defaultClient.trackEvent(eventMessage)
  }
}
module.exports = trackEvent
