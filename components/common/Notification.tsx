// Component
import { message, notification } from 'antd';
// Type
import { NotificationPlacement } from 'antd/lib/notification';

/**
 * [Function] Create a simple warning notification
 * @param title notification title
 * @param duration duration (milliseconds)
 * @param placement placement
 * @param description description
 */
export const createSimpleWarningNotification = (title: string, duration: number = 2.4, placement: NotificationPlacement = 'bottomRight', description?: string): void => {
  notification.warning({
    description: description,
    duration: duration,
    message: title,
    placement: placement
  });
}
/**
 * [Function] Create a notification
 * @param title notification title
 * @param duration duration (milliseconds)
 * @param placement placement
 * @param description description
 */
export const createNotification = (title: string, duration: number = 2.4, placement: NotificationPlacement = 'topRight', description?: string): void => {
  notification.success({
    description: description,
    duration: duration,
    message: title,
    placement: placement
  });
}
/**
 * [Function] Create a warning message
 * @param content message content
 * @param duration duration (seconds)
 * @param key message key (for overlapping protection)
 */
export const createWarningMessage = (content: string, duration?: number, key?: string): void => {
  message.warn({ content, duration, key });
}