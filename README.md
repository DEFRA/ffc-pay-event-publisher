# ffc-pay-event-publisher
NPM module for publishing events

## Usage

### Installation

```
npm install --save ffc-pay-event-publisher

```

### Configuration

`name` - name of connection, if not supplied the address name will be used.  This value is also used in App Insights tracing

`host` - Azure Service Bus namespace, for example, `myservicebus.servicebus.windows.net`

`useCredentialChain` - Boolean value for whether to authenticate connection with using Azure's credential chain.  For example, set this to true if you wish to use [AAD Pod Identity](https://github.com/Azure/aad-pod-identity).  If `false`, then `username` and `password` are required.

`username` - Azure Service Bus Shared Access Key name for authentication.  Not required if `useCredentialChain` is `true`.

`password` - Azure Service Bus Shared Access Key value for authentication.  Not required if `useCredentialChain` is `true`.

`type` - Azure Service Bus entity to connect to, allows `queue`, `sessionQueue`, `topic` or `subscription`.

`address` - Name of the Azure Service Bus queue, topic or subscription to connect to.

`topic` - Required for subscription connections only.  The name of the topic the subscription belongs to.

`appInsights` - Application Insights module if logging is required

`retries` - How many times should a sender try to send a message, defaulting to `5` if not supplied.  With Pod Identity and Azure Identity there is a scenario that the identity will not be allocated in time for it's usage which causes failure sending messages.  `5` is usually sufficient but can be increased if necessary.

`retryWaitInMs` - How long should a sender wait in milliseconds before trying to resend, defaulting to `500` if not supplied.

`exponentialRetry` - Whether to exponentially retry, ie doubling the `retryWaitInMs` on every retry.  Defaulted to `false`.

`autoCompleteMessages` - (Subscriptions only - see below) Whether to auto complete messages once the action method has ran.  Defaults to `false`.

`maxConcurrentCalls` - (Subscriptions only - see below) Maximum number of messages received from message handler without being settled.  Defaults to `1`.

#### Example

```
const config = {
  host: 'myservicebus.servicebus.windows.net',
  useCredentialChain: false,
  username: 'mySharedAccessKeyName',
  password: 'mySharedAccessKey,
  address: 'mySubscription,
  type: 'subscription',
  topic: 'myTopic',
  appInsights: require('applicationinsights'),
  retries: 5
}
```

### Send event

Message objects must follow the below structure.

`name` - the name of the event

`properties`:

`id` - unique id to trace the events through the payments process

`checkpoint` - name of the service the event is raised from

`status` - the status of the payment eg. “in progress”, “completed”, “error”

`message` - description of the raised event

`timeStamp` - the timestamp of when the event was raised 

`data` - an object of the data associated to the raised event

#### Example usage

```
const { PublishEvent } = require('ffc-pay-event-publisher')

const eventPublisher = new PublishEvent(config)

await eventPublisher.sendEvent({
    name: 'Test event',
    properties: {
      id: '1234567890',
      checkpoint: 'tests-service',
      status : 'success',
      action: {
        type: 'processing',
        message: 'Processing payment request',
        timestamp: '01/01/2022',
        data: {
          test: 'test data'
        }
      }
    }
  })

```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
