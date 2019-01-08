import React from 'react';
import PropTypes from 'prop-types';

class CardHeader extends React.Component {
    static propTypes = {
        className: PropTypes.string
    };

    render() {
        const { className = '', children, ...htmlAttributes } = this.props;

        return (
            <div className={`vp-card__header ${className}`} {...htmlAttributes}>
                {children}
            </div>
        );
    }
}

export default CardHeader;
