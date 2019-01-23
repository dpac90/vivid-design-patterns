import React from 'react';

export default ({ error }) => {
    if (!error) return null;

    return <span className="vp-helper-text--validation">{error}</span>;
};
