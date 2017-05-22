import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Notification from '../components/Notification';
import * as actions from '../actions';

const NotificationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
  position: fixed;
  bottom: 3rem;
`;

const NotificationList = ({ notifications, endNotification }) => (
  <NotificationListContainer>
    {notifications.map(({ id, modifierClass, inner }) => (
      <Notification key={id} onDelete={() => endNotification(id)} modifierClass={modifierClass}>
        {inner}
      </Notification>
    ))}
  </NotificationListContainer>
);

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      inner: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
      ]).isRequired,
      modifierClass: PropTypes.string,
    }),
  ).isRequired,
  endNotification: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  notifications: state.notificationList,
});

export default connect(mapStateToProps, actions)(NotificationList);
