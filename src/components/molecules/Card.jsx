import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Card extends React.Component {
    static propTypes = {
        header: PropTypes.node,
        footer: PropTypes.node,
        anchor: PropTypes.bool,
        list: PropTypes.bool,
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    static Footer({ className = '', children, centered = false, ...htmlAttributes }) {
        const footerClassNames = classNames(`vp-card__footer ${className}`, {
            ['--centered']: centered
        });

        return (
            <div className={footerClassNames} {...htmlAttributes}>
                {children}
            </div>
        );
    }

    static Header({ className = '', children, ...htmlAttributes }) {
        return (
            <div className={`vp-card__header ${className}`} {...htmlAttributes}>
                {children}
            </div>
        );
    }

    static Body({ className = '', children, ...htmlAttributes }) {
        return (
            <div className={`vp-card__body ${className}`} {...htmlAttributes}>
                {children}
            </div>
        );
    }

    render() {
        const { className, list, anchor, children, ...htmlAttributes } = this.props;
        const cardClassNames = classNames(`vp-card ${className}`, {
            ['--anchor']: anchor,
            ['--list']: list
        });

        console.log('Children Length', React.Children.toArray().length);
        return (
            <div className={cardClassNames} {...htmlAttributes}>
                {React.Children.toArray().length ? { children } : <Card.Body>{children}</Card.Body>}
            </div>
        );
    }
}

export default Card;
