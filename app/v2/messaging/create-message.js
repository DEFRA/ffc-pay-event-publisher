const { randomUUID } = require('node:crypto')

const createMessage = (event) => {
  const { type, source, subject = undefined, data = undefined } = event
  return {
    body: {
      specversion: '1.0',
      type,
      source,
      id: randomUUID(),
      time: new Date().toISOString(),
      subject,
      datacontenttype: 'text/json',
      data
    },
    type,
    source
  }
}

module.exports = {
  createMessage
}
