import React from 'react';

export default ({ label, id }) => {
    if (!label) return null;

    return (
        <label className="vp-floating-label" htmlFor={id}>
            {label}
        </label>
    );
};
