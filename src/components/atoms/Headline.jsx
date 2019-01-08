import React from 'react';
import { getTypeClassNames } from '../../utils/typographyUtils';
const Headline = ({
    children,
    className,
    importance,
    weight,
    height,
    state,
    alignment,
    capitalization,
    truncate,
    list,
    ...htmlAttributes
}) => {
    const baseClassName = getTypeClassNames(`vp-type-headline${importance}`, {
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
        importance,
        ...htmlAttributes
    };

    switch (importance) {
        case 1: {
            return <h1 {...attributes}>children</h1>;
        }

        case 2: {
            return <h2 {...attributes}>children</h2>;
        }

        case 3: {
            return <h3 {...attributes}>children</h3>;
        }

        case 4: {
            return <h4 {...attributes}>children</h4>;
        }

        case 5: {
            return <h5 {...attributes}>children</h5>;
        }

        case 6: {
            return <h1 {...attributes}>children</h1>;
        }
    }
};

Headline.propTypes = {
    importance: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

export default Headline;
