import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Chip({ label, onClose, value, className, ...htmlAttributes }) {
    const onCloseVal = value || label;
    const classNameList = classNames('vp-chip', {
        [className]: !!className
    });

    return (
        <span
            className={classNameList}
            onClick={() => {
                onClose(onCloseVal);
            }}
            {...htmlAttributes}>
            {label}
        </span>
    );
}

Chip.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onClose: PropTypes.func
};

Chip.defaultProps = {
    className: '',
    label: '',
    value: '',
    onClose: () => {}
};

export default Chip;
