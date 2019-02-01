import React from 'react';
import PropTypes from 'prop-types';

function Toggle({ title, className, ariaLabel, on, onToggle: onToggleProp, ...htmlProps }) {
    const onToggle = e => {
        onToggleProp(e.target.checked);
    };

    return (
        <div className={`toggle ${className}`} {...htmlProps}>
            {!!title && <h4 className="toggle-title">{title}</h4>}
            <span>
                <label className="toggle-switch" aria-label={ariaLabel}>
                    <input type="checkbox" onChange={onToggle} checked={on} />
                    <span className="toggle-button round" />
                </label>
            </span>
        </div>
    );
}

Toggle.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
    on: PropTypes.bool,
    onToggle: PropTypes.func.isRequired
};

Toggle.defaultProps = {
    title: '',
    className: '',
    ariaLabel: 'toggle',
    on: false,
    onToggle: () => {}
};

export default Toggle;
