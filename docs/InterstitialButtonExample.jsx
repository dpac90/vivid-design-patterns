import React from 'react';

import Button from '../src/components/atoms/Button';
import Interstitial from '../src/components/atoms/Interstitial';
import Icon from '../src/components/atoms/Icon';
import Subhead from '../src/components/atoms/Subhead';
import Headline from '../src/components/atoms/Headline';
import Link from '../src/components/atoms/Link';
import BodyText from '../src/components/atoms/BodyText';

class InterstitialButtonExample extends React.Component {
    state = {
        opened: false
    };

    onClick = opened => {
        this.setState({ opened });
    };

    render() {
        const { onClick } = this;

        const style = {
            background: `#fff url(http://a.vsstatic.com/mobile/smartbanner/ios-2019-rewards.png) no-repeat center 60%`,
            backgroundSize: 'contain',
            boxSizing: 'border-box',
            top: 0,
            flex: 1
        };

        const buttons = {
            position: 'absolute',
            bottom: '0',
            right: '0',
            left: '0',
            height: '20%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem'
        };

        const closeButton = {
            position: 'absolute',
            top: '0',
            right: 0,
            padding: '1rem',
            cursor: 'pointer'
        };

        const title = {
            padding: '1.5rem',
            marginTop: '30px',
            top: '0',
            right: 0
        };

        const rewards = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '8px'
        };

        return (
            <React.Fragment>
                <Button onClick={() => onClick(!this.state.opened)}>Click</Button>
                <Interstitial dataState={this.state.opened ? 'opened' : 'closed'} style={style}>
                    <Icon type="close" style={closeButton} onClick={() => onClick(!this.state.opened)} />
                    <div style={title}>
                        <Headline importance={5}>Earn Credit Back When You Buy In-App</Headline>
                        <BodyText height="compressed" style={{ marginTop: 8 }}>
                            Vivid Seats Rewards, exclusively on our app, lets you earn credit back on every purchase.
                        </BodyText>
                        <div style={rewards}>
                            <img width="32" height="32" src="//a.vsstatic.com/company/rewards/2x-badge.png" />
                            <Subhead importance={6}>Limited Time: Double credit thru Sep 2!</Subhead>
                        </div>
                    </div>
                    <div style={buttons}>
                        <Button>Earn in App</Button>
                        <Link>I don't want credit back</Link>
                    </div>
                </Interstitial>
            </React.Fragment>
        );
    }
}

export default InterstitialButtonExample;
