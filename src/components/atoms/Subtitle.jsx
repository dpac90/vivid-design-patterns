import React from 'react';
import PropTypes from 'prop-types';
import { getTypeClassNames, TYPOGRAPHY_PROP_TYPES } from '../../utils/typographyUtils';

const Subtitle = ({
    children,
    className = '',
    importance = 1,
    weight,
    height,
    state,
    alignment,
    capitalization,
    truncate,
    list,
    ...htmlAttributes
}) => {
    const baseClassName = getTypeClassNames(`vp-type-subtitle${importance}`, {
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

Subtitle.propTypes = {
    importance: PropTypes.oneOf([1, 2]),
    ...TYPOGRAPHY_PROP_TYPES
};

export default Subtitle;
