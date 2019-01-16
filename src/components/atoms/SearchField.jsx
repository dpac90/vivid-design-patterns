import React from 'react';
import PropTypes from 'prop-types';

class SearchField extends React.Component {
    componentWillMount() {
        this.setState({
            inputValue: this.props.value
        });
    }

    resetInput = () => {
        this.setState({ inputValue: '' });
    };

    onChange = event => {
        this.setState({
            inputValue: event.target.value
        });
        this.props.onChange(event);
    };

    onSubmit = event => {
        const isEnterPressed = event.which === 13 || event.keyCode === 13;
        return isEnterPressed ? this.props.onSubmit(event) : null;
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
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        id: 'searchField',
        name: 'searchField',
        value: '',
        autoComplete: 'off',
        placeholder: undefined,
        className: undefined,
        onClick: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onChange: () => {},
        onMouseLeave: () => {},
        onMouseEnter: () => {},
        onSubmit: () => {}
    };

    render() {
        const { className, onClick, onFocus, onMouseEnter, onMouseLeave, onBlur, placeholder, name, autoComplete, id } = this.props;
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
            autoComplete
        };
        return (
            <div className={classNames}>
                <i className="vp-search-field__icon-search material-icons">&#xE8B6;</i>
                <input
                    type="text"
                    className="vp-search-field__input"
                    onChange={this.onChange}
                    onKeyPress={this.onSubmit}
                    value={inputValue}
                    {...props}
                />
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
