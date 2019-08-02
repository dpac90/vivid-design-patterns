import React from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import Subhead from '../atoms/Subhead';

function defaultRenderSuggestion({ isHighlighted, suggestion, suggestionProps }) {
    if (typeof suggestion === 'string') {
        return <Typeahead.SuggestionItem {...{ isHighlighted, ...suggestionProps }}>{suggestion}</Typeahead.SuggestionItem>;
    } else {
        throw new Error('A renderSuggestion prop is required if the suggestions is not an array of strings.');
    }
}

function defaultRenderDropdown(dropDownContent) {
    return dropDownContent;
}

function defaultRenderInput({ placeholder, onChange, onFocus }) {
    return <SearchField placeholder={placeholder} onChange={onChange} onFocus={onFocus} />;
}

class Typeahead extends React.Component {
    state = {
        highlightedIndex: -1,
        highlightedItem: {},
        value: '',
        isDropdownShown: !!this.props.suggestions
    };

    typeahead = React.createRef();

    static Dropdown = ({ className, children, ...htmlProps }) => <div className={`vdp-typeahead__dropdown ${className}`}>{children}</div>;

    static SuggestionItem = ({ isHighlighted, className = '', children, ...props }) => {
        return (
            <div className={`vdp-typeahead__suggestion ${isHighlighted ? '--highlight' : ''} ${className}`} {...props}>
                {children}
            </div>
        );
    };

    static DropdownSection = ({ className = '', children, ...htmlProps }) => (
        <div className={`vdp-typeahead__section ${className}`} {...htmlProps}>
            {children}
        </div>
    );

    static DropdownHeader = ({ className = '', children, ...htmlProps }) => (
        <div className={`vdp-typeahead__section__header ${className}`} {...htmlProps}>
            <Subhead state="inverted">{children}</Subhead>
        </div>
    );

    componentDidMount() {
        window.addEventListener('click', this.hideDropDown);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.hideDropDown);
    }

    getHierarchicalDropdown = suggestions => {
        let acc = 0;
        return suggestions.map((hierarchy, index) => {
            const { title, items, renderSuggestion, limit } = hierarchy;
            const startingIndex = acc;
            acc += items.length;
            return (
                !!items.length && (
                    <Typeahead.DropdownSection className="vdp-typeahead__section" key={title}>
                        <Typeahead.DropdownHeader className="vdp-typeahead__section__header">{title}</Typeahead.DropdownHeader>
                        {this.getSuggestions({ suggestions: items, startingIndex, renderSuggestion, displayLimit: limit })}
                    </Typeahead.DropdownSection>
                )
            );
        });
    };

    getSuggestions = ({ suggestions, startingIndex = 0, renderSuggestion, displayLimit }) => (
        <div className="vdp-typeahead__suggestions">
            {suggestions.map((suggestion, index) => {
                if (index >= displayLimit) {
                    return;
                }
                const { highlightedIndex } = this.state;
                const absoluteIndex = index + startingIndex;
                const isHighlighted = highlightedIndex === absoluteIndex;
                const suggestionProps = {
                    onMouseEnter: () => this.setState({ highlightedIndex: absoluteIndex, highlightedItem: suggestion }),
                    onClick: () => this.props.onSelect(suggestion)
                };
                const renderSuggestionArgs = { isHighlighted, suggestionProps, suggestion };
                return typeof renderSuggestion !== 'undefined'
                    ? renderSuggestion(renderSuggestionArgs)
                    : this.props.renderSuggestion(renderSuggestionArgs);
            })}
        </div>
    );

    onKeyDown = e => {
        const { key, keyCode, which } = e;
        const { showHierarchicalDropdown, suggestions } = this.props;
        const flatSuggestions = showHierarchicalDropdown ? this.flattenSuggestions() : suggestions;
        let { highlightedIndex } = this.state;
        if (key === 'Enter' || which === 13 || keyCode === 13) {
            if (highlightedIndex === -1) {
                this.props.onSelect(this.state.value);
            } else {
                this.props.onSelect(flatSuggestions[highlightedIndex]);
            }
        } else if (keyCode === '40' || which === '40' || key === 'ArrowDown') {
            if (highlightedIndex < flatSuggestions.length - 1) {
                highlightedIndex += 1;
            }

            this.setState({
                highlightedIndex,
                highlightedItem: flatSuggestions[highlightedIndex] || {}
            });
        } else if (keyCode === '38' || which === '38' || key === 'ArrowUp') {
            if (highlightedIndex > -1) {
                highlightedIndex -= 1;
            }

            this.setState({
                highlightedIndex,
                highlightedItem: flatSuggestions[highlightedIndex] || {}
            });
        }
    };

    flattenSuggestions() {
        const { suggestions } = this.props;
        return suggestions.reduce((acc, curr) => {
            return [...acc, ...curr.items];
        }, []);
    }

    onInputSubmit = value => {
        const { highlightedIndex, highlightedItem } = this.state;
        if (highlightedIndex < 0) {
            this.props.onSelect(value);
        } else {
            this.props.onSelect(highlightedItem);
        }
    };

    onChange = e => {
        const { value } = e.target;
        this.setState({
            highlightedIndex: -1,
            value,
            highlightedItem: {}
        });
        this.props.onChange(value);
    };

    showDropdown = () => {
        if (this.props.suggestions) {
            this.setState(
                {
                    isDropdownShown: true
                },
                this.props.onDropdownShown
            );
        }
    };

    hideDropDown = e => {
        if (this.typeahead.current && this.typeahead.current.contains(e.target)) {
            return;
        }
        this.setState(
            {
                isDropdownShown: false
            },
            this.props.onHideDropDown
        );
    };

    render() {
        const {
            className,
            placeholder,
            onChange,
            suggestions,
            onSelect,
            children,
            SuggestionItem,
            showHierarchicalDropdown,
            renderSuggestion,
            renderDropdown,
            onHideDropdown,
            onShowDropdown,
            displayLimit,
            renderInput,
            ...htmlAttributes
        } = this.props;
        const { isDropdownShown } = this.state;
        const showDropdown = !!suggestions.length && isDropdownShown;
        const dropdownContent = showHierarchicalDropdown
            ? this.getHierarchicalDropdown(suggestions)
            : this.getSuggestions({ suggestions, displayLimit });
        return (
            <div
                ref={this.typeahead}
                className={`vdp-typeahead ${className}`}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={showDropdown}
                onKeyDown={this.onKeyDown}
                {...htmlAttributes}>
                {renderInput({ placeholder, onFocus: this.showDropdown, onChange: this.onChange })}
                {showDropdown && <Typeahead.Dropdown>{renderDropdown(dropdownContent)}</Typeahead.Dropdown>}
            </div>
        );
    }
}

Typeahead.propTypes = {
    suggestions: PropTypes.array,
    /* callback when dropdown is displayed */
    onShowDropdown: PropTypes.func,
    /* callback when dropdown is hidden */
    onHideDropdown: PropTypes.func,
    showHierarchicalDropdown: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    /* Custom suggestion render method */
    renderSuggestion: PropTypes.func,
    /* Custom dropdown render method */
    renderDropdown: PropTypes.func,
    /* Custom input render method */
    renderInput: PropTypes.func,
    /* limit the number of suggestions displayed */
    displayLimit: PropTypes.number
};

Typeahead.defaultProps = {
    suggestions: [],
    className: '',
    showHierarchicalDropdown: false,
    renderInput: defaultRenderInput,
    renderSuggestion: defaultRenderSuggestion,
    renderDropdown: defaultRenderDropdown,
    displayLimit: 10,
    onShowDropdown: () => {},
    onHideDropdown: () => {}
};

export default Typeahead;
