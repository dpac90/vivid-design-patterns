import React from 'react';
import { getTypeClassNames, TYPOGRAPHY_PROP_TYPES } from '../../utils/typographyUtils';

const Subhead = ({ children, className = '', weight, height, state, alignment, capitalization, truncate, list, ...htmlAttributes }) => {
    const baseClassName = getTypeClassNames('vp-type-subhead', {
        weight,
        height,
        state,
        alignment,
        capitalization,
        truncate,
        list
    });
    const attributes = {
        className: `${baseClassName} ${className}`,
        ...htmlAttributes
    };

    return <p {...attributes}>{children}</p>;
};

Subhead.propTypes = TYPOGRAPHY_PROP_TYPES;

export default Subhead;
