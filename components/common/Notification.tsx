// Component
import { message, notification } from 'antd';

/**
 * [Function] Create a simple warning notification
 * @param message notification message
 */
export const createSimpleWarningNotification = (message: string): void => {
  notification.warning({
    description: message,
    duration: 2.4,
    message: 'Wanring'
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