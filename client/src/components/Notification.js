import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Notification = ({ children, modifierClass, onDelete }) => {
  const notificationClass = classnames('notification', { [modifierClass]: modifierClass });
  return (
    <NotificationContainer className={notificationClass}>
      <button className="delete" onClick={onDelete} />
      {children}
    </NotificationContainer>
  );
};

Notification.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  modifierClass: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  modifierClass: '',
};

export default Notification;
