import React from 'react';
import PropTypes from 'prop-types';

const CardHero = ({ className = '', loadImageViaCss = false, imageSrc, alt, ...htmlAttributes }) => {
    if (loadImageViaCss) {
        return (
            <div
                className={`vp-card__hero ${className}`}
                style={{ backgroundImage: `url('${imageSrc}');` }}
                {...htmlAttributes}
                role="img"
                aria-label={alt}
            />
        );
    }

    return <img className={`vp-card__hero__image ${className}`} src={imageSrc} {...htmlAttributes} alt={alt} />;
};

CardHero.propTypes = {
    /** Alt text for hero image */
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    /** Hero image url */
    imageSrc: PropTypes.string.isRequired,
    /** Defines whether the hero image is loaded  via an image tag or a backgroundImage style property via css */
    loadImageViaCss: PropTypes.bool
};

export default CardHero;
