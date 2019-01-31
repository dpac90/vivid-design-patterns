import React from 'react';
import { getTypeClassNames, TYPOGRAPHY_PROP_TYPES } from '../../utils/typographyUtils';

const Subhead = ({ children, className, weight, height, state, alignment, capitalization, truncate, list, ...htmlAttributes }) => {
    const classNames = getTypeClassNames('vp-type-subhead', {
        weight,
        height,
        state,
        alignment,
        capitalization,
        truncate,
        list,
        className
    });
    const attributes = {
        className: classNames,
        ...htmlAttributes
    };

    return <p {...attributes}>{children}</p>;
};

Subhead.propTypes = TYPOGRAPHY_PROP_TYPES;

export default Subhead;