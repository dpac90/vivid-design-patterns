import React from 'react';
import PropTypes from 'prop-types';
import CardBody from '../atoms/CardBody';
import CardFooter from '../atoms/CardFooter';
import CardHeader from '../atoms/CardHeader';
import CardHero from '../atoms/CardHero';
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

    static Footer = CardFooter;
    static Header = CardHeader;
    static Body = CardBody;
    static Hero = CardHero;

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
