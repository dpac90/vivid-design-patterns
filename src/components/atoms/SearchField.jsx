import React from 'react';
import PropTypes from 'prop-types';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputValue: props.value };
    }

    resetInput = () => {
        this.setState({ inputValue: '' }, this.props.onChange(''));
    };

    onChange = event => {
        this.setState(
            {
                inputValue: event.target.value
            },
            this.props.onChange(event.target.value)
        );
    };

    onKeyPress = event => {
        const isEnterPressed = event.which === 13 || event.keyCode === 13;
        if (isEnterPressed) {
            this.props.onSubmit(event.target.value);
        }
        this.props.onKeyPress(event.target.value);
    };

    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        autoComplete: PropTypes.string,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onKeyPress: PropTypes.func,
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        id: 'searchField',
        name: 'searchField',
        value: '',
        type: 'text',
        autoComplete: 'off',
        placeholder: undefined,
        className: undefined,
        onClick: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onChange: () => {},
        onMouseLeave: () => {},
        onMouseEnter: () => {},
        onKeyPress: () => {},
        onSubmit: () => {}
    };

    render() {
        const { className, onClick, onFocus, onMouseEnter, onMouseLeave, onBlur, placeholder, name, autoComplete, id, type } = this.props;
        const { inputValue } = this.state;
        const classNames = className ? `vp-search-field ${className}` : 'vp-search-field';
        const props = {
            onMouseEnter,
            onMouseLeave,
            onClick,
            onFocus,
            onBlur,
            placeholder,
            name,
            id,
            type,
            autoComplete
        };
        return (
            <div className={classNames}>
                <i className="vp-search-field__icon-search material-icons">&#xE8B6;</i>
                <input type="text" className="vp-search-field__input" onChange={this.onChange} value={inputValue} {...props} />
                {!!inputValue && (
                    <i className="vp-search-field__icon-close material-icons" onClick={this.resetInput}>
                        &#xE5C9;
                    </i>
                )}
            </div>
        );
    }
}

export default SearchField;
