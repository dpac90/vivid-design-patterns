import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from './Headline';

class Toggle extends Component {
    static propTypes = {
        title: PropTypes.string,
        className: PropTypes.string,
        ariaLabel: PropTypes.string,
        on: PropTypes.bool,
        onToggle: PropTypes.func,
        defaultOn: PropTypes.bool
    };

    static defaultProps = {
        title: '',
        className: '',
        ariaLabel: 'toggle',
        onToggle: () => {},
        defaultOn: false
    };

    state = {
        on: this.props.on || this.props.defaultOn
    };

    onToggle = e => {
        const on = e.target.checked;

        if (!this.isControlled('on')) {
            this.setState({ on }, () => {
                this.props.onToggle(this.state.on);
            });
        } else {
            this.props.onToggle(on);
        }
    };

    isControlled = propName => this.props[propName] !== undefined;

    render() {
        const { title, className, ariaLabel, on, onToggle, defaultOn, ...htmlProps } = this.props;
        const checked = this.isControlled('on') ? this.props.on : this.state.on;

        return (
            <div className={`toggle ${className}`}>
                {!!title && (
                    <Headline importance={4} className="toggle-title">
                        {title}
                    </Headline>
                )}
                <label className="toggle-switch" aria-label={ariaLabel}>
                    <input type="checkbox" onChange={this.onToggle} checked={checked} {...htmlProps} />
                    <span className="toggle-button round" />
                </label>
            </div>
        );
    }
}

export default Toggle;
