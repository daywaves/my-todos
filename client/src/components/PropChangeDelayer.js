import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

/*
  Delays child prop value changes of prop specified by delayedPropName.
    delay:
      Delay period in milliseconds.
    delayedPropName:
      Name the child component(s) will receive the delayed prop as.
    value:
      The current value for the delayed prop. Changes of this value are not passed to the child
      component(s) until the delay period has passed.
    resetValue (optional):
      Value the prop will be reset to whenever the value changes.
*/
class PropChangeDelayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passedValue: props.value,
    };
  }
  componentWillReceiveProps(newProps) {
    const { value, resetValue, delay } = this.props;
    const newValue = newProps.value;
    if (value !== newValue) {
      clearTimeout(this.timeout);
      if (typeof resetValue !== 'undefined') {
        this.setState({ passedValue: resetValue });
      }
      this.timeout = setTimeout(() => this.setState({ passedValue: newValue }), delay);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    const delayedPropName = this.props.delayedPropName;
    const passedValue = this.state.passedValue;
    return (
      <div>
        {Children.map(this.props.children, child =>
          cloneElement(child, { [delayedPropName]: passedValue }),
        )}
      </div>
    );
  }
}

PropChangeDelayer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  delay: PropTypes.number.isRequired,
  delayedPropName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  resetValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

PropChangeDelayer.defaultProps = {
  resetValue: undefined,
};

export default PropChangeDelayer;
