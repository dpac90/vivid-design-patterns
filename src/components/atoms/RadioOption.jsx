import React from 'react';

const RadioOption = ({ isChecked, className = '', error, label, children, ...attributes }) => (
    <label className={`vp-control--radio ${className}`} aria-label="radio">
        <input hidden type="radio" className="vp-control__input" checked={isChecked} {...attributes} />
        <span className="vp-control__span">{label}</span>
    </label>
);

export default RadioOption;
