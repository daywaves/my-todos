export const DISPLAY_NOTIFICATION_BEGIN = 'DISPLAY_NOTIFICATION_BEGIN';
export const DISPLAY_NOTIFICATION_END = 'DISPLAY_NOTIFICATION_END';

let notificationID = 0;
const notificationTimeouts = {};

export const endNotification = (id) => {
  clearTimeout(notificationTimeouts[id]);
  return {
    type: DISPLAY_NOTIFICATION_END,
    id,
  };
};

export const displayNotification = (inner, modifierClass, duration = 5000) => (dispatch) => {
  const id = notificationID;
  dispatch({ type: DISPLAY_NOTIFICATION_BEGIN, id, inner, modifierClass });
  notificationTimeouts[id] = setTimeout(() => dispatch(endNotification(id)), duration);
  notificationID += 1;
};
