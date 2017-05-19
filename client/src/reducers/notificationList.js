import * as actions from '../actions';

const notificationList = (state = [], action) => {
  switch (action.type) {
    case actions.DISPLAY_NOTIFICATION_BEGIN: {
      const { id, inner, modifierClass } = action;
      return [...state, { id, inner, modifierClass }];
    }
    case actions.DISPLAY_NOTIFICATION_END:
      return state.filter(notification => notification.id !== action.id);
    default:
      return state;
  }
};

export default notificationList;
