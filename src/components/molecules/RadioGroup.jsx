import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RadioOption from '../atoms/RadioOption';
import Label from '../atoms/Label';
import ErrorMessage from '../atoms/ErrorMessage';

class RadioGroup extends React.Component {
    state = {
        value: this.props.value || '',
        error: this.props.error || ''
    };

    static propTypes = {
        onChange: PropTypes.func,
        children: PropTypes.node.isRequired,
        className: PropTypes.string
    };

    static defaultProps = {
        onChange: () => {},
        validationMethod: () => {},
        className: ''
    };

    onChange = e => {
        const { value } = e.target;
        const error = this.props.validationMethod(value);
        if (this.isControlled('value')) {
            this.props.onChange(value);
        } else {
            this.setState(
                {
                    value,
                    error
                },
                () => {
                    this.props.onChange(this.state.value);
                }
            );
        }
    };

    isControlled(propName) {
        return this.props[propName] !== undefined;
    }

    render() {
        const { children, className } = this.props;
        const { value } = this.state;
        const { props } = this;
        const classNames = className ? `vp-radio-group ${className}` : 'vp-radio-group';
        return (
            <div className={classNames}>
                {React.Children.map(children, child =>
                    React.cloneElement(child, {
                        isChecked: value === child.props.value,
                        name: props.name,
                        onChange: event => this.onChange(event)
                    })
                )}
            </div>
        );
    }
}

export default RadioGroup;
