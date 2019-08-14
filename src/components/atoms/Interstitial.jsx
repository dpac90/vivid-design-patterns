import React from 'react';
import PropTypes from 'prop-types';

class Interstitial extends React.Component {
    static DATA_STATE = {
        OPENED: 'opened',
        CLOSED: 'closed'
    };

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        dataState: PropTypes.oneOf([Interstitial.DATA_STATE.OPENED, Interstitial.DATA_STATE.CLOSED])
    };

    static defaultProps = {
        dataState: Interstitial.DATA_STATE.CLOSED
    };

    render() {
        const { className = '', children, dataState = 'closed', ...htmlAtrributes } = this.props;

        if (dataState === Interstitial.DATA_STATE.CLOSED) {
            document.body.style.overflow = 'unset';
            return null;
        } else {
            document.body.style.overflow = 'hidden';
        }

        return (
            <aside
                className={`vdp-interstitial ${!!className ? ` ${className}` : ''}`}
                data-state={dataState.length ? dataState : Interstitial.DATA_STATE.CLOSED}
                {...htmlAtrributes}>
                {children}
            </aside>
        );
    }
}

export default Interstitial;
