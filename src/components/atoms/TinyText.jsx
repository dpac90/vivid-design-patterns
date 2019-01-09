import React from 'react';
import { getTypeClassNames, TYPOGRAPHY_PROP_TYPES } from '../../utils/typographyUtils';

const SmallText = ({ children, className = '', weight, height, state, alignment, capitalization, truncate, list, ...htmlAttributes }) => {
    const baseClassName = getTypeClassNames('vp-type-tiny', {
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

    return <small {...attributes}>{children}</small>;
};

SmallText.propTypes = TYPOGRAPHY_PROP_TYPES;

export default SmallText;
