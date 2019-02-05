import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Chip extends Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        onClose: PropTypes.func
    };

    static defaultProps = {
        className: '',
        value: '',
        onClose: () => {}
    };

    onClose = e => {
        e.preventDefault();
        const { value, label } = this.props;
        this.props.onClose(value || label);
    };

    onKeyPress = e => {
        e.preventDefault();
        if (e.keyCode === 13) {
            this.onClose(e);
        }
    };

    render() {
        const { onKeyPress, onClose, props } = this;
        const { label, value, onClose: callback, className: classes, ...htmlAttributes } = props;
        const className = classNames('vp-chip', {
            [classes]: !!classes
        });

        return (
            <a href="#!" onClick={onClose} onKeyPress={onKeyPress} {...{ className }} {...htmlAttributes}>
                {label}
            </a>
        );
    }
}

export default Chip;
