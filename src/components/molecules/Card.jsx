import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Card extends React.Component {
    static propTypes = {
        header: PropTypes.node,
        footer: PropTypes.node,
        type: PropTypes.oneOf(['standard', 'list', 'anchor']),
        className: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        className: '',
        type: 'standard',
        onClick: () => {}
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

    static Hero({ className = '', desktopOnly = false, imageSrc }) {
        if (desktopOnly) {
            return <div className="vp-card__hero" style={{ backgroundImage: `url('${imageSrc}');` }} />;
        }

        return <img className="vp-card__hero__image" src={imageSrc} />;
    }

    render() {
        const { className, type, children, onClick, ...htmlAttributes } = this.props;
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
            <div className={cardClassNames} onClick={onClick} {...htmlAttributes}>
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
