import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullWidthLabel = styled.label`
  width: 100%;
`;

const Todo = ({ onChange, text, completed, id }) => (
  <div className="panel-block">
    <FullWidthLabel htmlFor={id} className="checkbox">
      <input id={id} type="checkbox" checked={completed} onChange={onChange} />
      {text}
    </FullWidthLabel>
  </div>
);

Todo.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Todo;
