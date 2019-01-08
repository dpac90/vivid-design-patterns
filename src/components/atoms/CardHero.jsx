import React from 'react';
import PropTypes from 'prop-types';

const CardHero = ({ className = '', loadImageViaCss = false, imageSrc }) => {
    if (loadImageViaCss) {
        return <div className="vp-card__hero" style={{ backgroundImage: `url('${imageSrc}');` }} />;
    }

    return <img className="vp-card__hero__image" src={imageSrc} />;
};

CardHero.propTypes = {
    className: PropTypes.string,
    /** Hero image url */
    imageSrc: PropTypes.string.isRequired,
    /** This property defines whether the hero image is loaded  via an image tag or a backgroundImage style property via css */
    loadImageViaCss: PropTypes.bool
};

export default CardHero;
