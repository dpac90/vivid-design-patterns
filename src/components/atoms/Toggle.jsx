import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toggle extends Component {
    static propTypes = {
        title: PropTypes.string,
        className: PropTypes.string,
        ariaLabel: PropTypes.string,
        on: PropTypes.bool,
        onToggle: PropTypes.func.isRequired
    };

    static defaultProps = {
        title: '',
        className: '',
        ariaLabel: 'toggle',
        onToggle: () => {}
    };

    state = {
        on: this.props.on
    };

    onToggle = e => {
        const on = e.target.checked;

        if (!this.isControlled('on')) {
            this.setState({ on }, () => {
                this.props.onToggle(this.state.on);
            });
        }

        this.props.onToggle(on);
    };

    isControlled = propName => {
        return this.props[propName] !== undefined;
    };

    render() {
        const { title, className, ariaLabel, on, onToggle, ...htmlProps } = this.props;
        const checked = this.isControlled('on') ? this.props.on : this.state.on;

        return (
            <div className={`toggle ${className}`} {...htmlProps}>
                {!!title && <h4 className="toggle-title">{title}</h4>}
                <span>
                    <label className="toggle-switch" aria-label={ariaLabel}>
                        <input type="checkbox" onChange={this.onToggle} checked={on} />
                        <span className="toggle-button round" />
                    </label>
                </span>
            </div>
        );
    }
}

export default Toggle;
