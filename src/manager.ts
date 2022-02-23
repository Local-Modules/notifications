import EventAggregator from '@locmod/event-aggregator'


type Event = 'open' | 'close'
type SubscribeHandler = (notification: OpenedNotification, notifications: OpenedNotifications) => void
type NotificationProps = { [key: string]: any }
type OpenedNotification = { id: number, name: string, props?: NotificationProps }
type OpenedNotifications = OpenedNotification[]


const events = new EventAggregator()
let notifications: OpenedNotifications = []
let notificationId = 1

const subscribe = (event: Event, handler: SubscribeHandler) => {
  events.subscribe(event, handler)
}

const unsubscribe = (event: Event, handler: SubscribeHandler) => {
  events.unsubscribe(event, handler)
}

const openNotification = (name: OpenedNotification['name'], props?: NotificationProps) => {
  const notification: OpenedNotification = { id: ++notificationId, name, props }

  notifications = [ ...notifications, notification ]

  events.dispatch('open', notification, notifications)
}

const closeNotification = (id: number): void => {
  const notification = notifications.find((notification) => notification.id === id)

  if (notification) {
    notifications = notifications.filter((notification) => notification.id !== id)
    events.dispatch('close', notification, notifications)
  }
}

const closeAllNotifications = (): void => {
  notifications.forEach((notification) => {
    closeNotification(notification.id)
  })
}


export {
  subscribe,
  unsubscribe,
  openNotification,
  closeNotification,
  closeAllNotifications,
}
