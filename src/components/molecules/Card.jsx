import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Card extends React.Component {
    static propTypes = {
        header: PropTypes.node,
        footer: PropTypes.node,
        type: PropTypes.oneOf(['standard', 'list', 'anchor']),
        className: PropTypes.string
    };

    static defaultProps = {
        className: '',
        type: 'standard'
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

    static Hero({ className = '', children, imageSrc }) {
        return <div className={`vp-card__hero ${className}`} />;
    }

    render() {
        const { className, type, children, ...htmlAttributes } = this.props;
        let cardClassNames = className;

        switch (type) {
            case 'list': {
                cardClassNames += 'vp-card--list';
                break;
            }
            case 'anchor': {
                cardClassNames += 'vp-card--anchor';
                break;
            }
            default: {
                cardClassNames += 'vp-card';
            }
        }

        return (
            <div className={cardClassNames} {...htmlAttributes}>
                {React.Children.map(children, child => {
                    if (typeof child.type === 'function') {
                        return child;
                    } else {
                        return <Card.Body>{child}</Card.Body>;
                    }
                })}
            </div>
        );
    }
}

export default Card;
