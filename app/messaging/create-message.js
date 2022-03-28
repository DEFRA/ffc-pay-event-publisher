const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-pay-event-publisher',
    ...options
  }
}

module.exports = createMessage
