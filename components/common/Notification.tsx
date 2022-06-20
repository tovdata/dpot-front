// Component
import { message, notification } from 'antd';
// Type
import { NotificationPlacement } from 'antd/lib/notification';

/**
 * [Function] Create a notification for error
 * @param title 알림 제목
 * @param description 알림 설명
 * @param placement 알림 위치
 */
export const errorNotification = (title: string, description?: string, placement: NotificationPlacement = 'topRight'): void => {
  notification.error({
    description: description,
    duration: 2.2,
    message: title,
    placement: placement
  });
}
/**
 * [Function] Create a notification for success
 * @param title 알림 제목
 * @param description 알림 설명
 * @param placement 알림 위치
 */
export const successNotification = (title: string, description?: string, placement: NotificationPlacement = 'topRight'): void => {
  notification.success({
    description: description,
    duration: 2.2,
    message: title,
    placement: placement
  });
}
/**
 * [Function] Create a notification for warning
 * @param title 알림 제목
 * @param description 알림 설명
 * @param placement 알림 위치
 */
export const warningNotification = (title: string, description?: string, placement: NotificationPlacement = 'topRight'): void => {
  notification.warning({
    description: description,
    duration: 2.2,
    message: title,
    placement: placement
  });
}

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