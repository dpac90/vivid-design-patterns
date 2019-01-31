import React from 'react';
import { getTypeClassNames, TYPOGRAPHY_PROP_TYPES } from '../../utils/typographyUtils';

const SmallText = ({ children, className, weight, height, state, alignment, capitalization, truncate, list, ...htmlAttributes }) => {
    const classNames = getTypeClassNames('vp-type-tiny', {
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

    return <small {...attributes}>{children}</small>;
};

SmallText.propTypes = TYPOGRAPHY_PROP_TYPES;

export default SmallText;