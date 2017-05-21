import * as actions from '../actions';

const MAX_LENGTH = 3;

const notificationList = (state = [], action) => {
  switch (action.type) {
    case actions.DISPLAY_NOTIFICATION_BEGIN: {
      const { id, inner, modifierClass } = action;
      let nextState = state;
      if (state.length >= MAX_LENGTH) {
        nextState = nextState.slice(1, MAX_LENGTH);
      }
      return [...nextState, { id, inner, modifierClass }];
    }
    case actions.DISPLAY_NOTIFICATION_END:
      return state.filter(notification => notification.id !== action.id);
    default:
      return state;
  }
};

export default notificationList;
