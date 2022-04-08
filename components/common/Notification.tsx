// Component
import { notification } from 'antd';

/**
 * [Function] Create a simple warning notification
 */
export const createSimpleWarningNotification = (message: string) => {
  notification.warning({
    description: message,
    duration: 2.4,
    message: 'Wanring'
  });
}