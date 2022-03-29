const createMessage = (body, type, source, options) => {
  return {
    body,
    type,
    source: 'ffc-pay-event-publisher',
    ...options
  }
}

module.exports = createMessage
