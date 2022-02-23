# @locmod/notifications


Unlike Modals Notification system based on templates. The root component is `containers/App/Notifications`. It includes 
all templates of notifications. The templates should be placed in `compositions/notifications` folder.


## Installation
```bash
npm install --save @locmod/notifications
```
or
```bash
yarn add @locmod/notifications
```

## Create a notification

Create a notification in `compositions/notifications` folder. 

```typescript jsx
import React from 'react'

import { Box } from 'components/layout'
import { Title, Text } from 'components/typography'

import Notification from 'components/Notification/Notification'
import type { NotificationProps } from 'components/Notification/Notification'


type PlainNotificationProps = NotificationProps & {
  title: string | Intl.Message
  text: string | Intl.Message
}

const PlainNotification: React.FunctionComponent<PlainNotificationProps> = ({ title, text, closeNotification }) => (
  <Notification closeNotification={closeNotification}>
    <Title size="16-16" message={title} color="gold-50" />
    <Box mt={8}>
      <Text size="14-20" message={text} />
    </Box>
  </Notification>
)


export default PlainNotification

```

**danger**
Be sure `closeNotification` prop is used and passed to `<Notification />` component! It used inside notifications 
manager to understand what notification should be closed when close method is called.

You can use the code below as Live Template to create new notifications faster.

```typescript jsx
import Notification from 'components/Notification/Notification'
import type { NotificationProps } from 'components/Notification/Notification'


type $COMPONENT$Props = NotificationProps & {
  // custom props here
}

const $COMPONENT$: React.FunctionComponent<$COMPONENT$Props> = ({ closeNotification }) => (
  <Notification closeNotification={closeNotification}>
    {/* content here */}
  </Notification>
)


export default $COMPONENT$
```

**note**
As you can see the **Notification** component (base for all notifications) is taken from **components** folder. This is 
because of architecture, our own styles should be stored in **src** folder, not in **local_modules**. Please don't create 
additional base components.


## Add a notification to the system

```typescript
import PlainNotification from 'compositions/notifications/PlainNotification/PlainNotification'

export const templates = {
  'plain': PlainNotification,
} as const
```

`templates` used in `App/Notifications/type.d.ts` to create global `Notifications` type which used in 
`notifications/manager` to provide types experience when `openNotification` is used.


## Use created notification

```js
import { openNotification } from 'notifications'

openNotification('plain', {
  title: 'Success',
  text: 'User address is updated!'
})
``` 
