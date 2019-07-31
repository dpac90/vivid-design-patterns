import React from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import Subhead from '../atoms/Subhead';

function defaultRenderSuggestion({ isHighlighted, suggestion, suggestionProps }) {
    if (typeof suggestion === 'string') {
        return (
            <div className={`vdp-type-ahead-suggestion${isHighlighted ? '--highlight' : null}`} key={suggestion} {...suggestionProps}>
                {isHighlighted ? '*' : null}
                {suggestion}
            </div>
        );
    } else {
        throw new Error('A renderSuggestion prop is required if the suggestions is not an array of strings.');
    }
}

class TypeAhead extends React.Component {
    static getHierarchicalDropdown = (suggestions, SuggestionItem, onSelect, highlightedIndex, setHighlightedIndex, renderSuggestion) => {
        let acc = 0;
        return suggestions.map((hierarchy, index) => {
            const { title, items } = hierarchy;
            const startingIndex = acc;
            acc += items.length;
            return (
                !!items.length && (
                    <div className="vdp-type-ahead__section" id={title}>
                        <div className="vdp-type-ahead__section__header">
                            <Subhead state={'inverted'}>{title}</Subhead>
                        </div>
                        <TypeAhead.DropDown
                            suggestions={items}
                            renderSuggestion={renderSuggestion}
                            onSelect={onSelect}
                            highlightedIndex={highlightedIndex}
                            setHighlightedIndex={setHighlightedIndex}
                            startingIndex={startingIndex}
                        />
                        >
                    </div>
                )
            );
        });
    };

    static DropDown = ({ suggestions, onSelect, highlightedIndex, setHighlightedIndex, startingIndex = 0, renderSuggestion }) => (
        <div className="vdp-type-ahead__dropdown">
            {suggestions.map((suggestion, index) => {
                const absoluteIndex = index + startingIndex;
                const isHighlighted = highlightedIndex === absoluteIndex;
                const suggestionProps = {
                    onMouseEnter: () => setHighlightedIndex(absoluteIndex),
                    onClick: () => onSelect(suggestion)
                };
                return renderSuggestion({ isHighlighted, suggestionProps, suggestion });
            })}
        </div>
    );

    state = {
        highlightedIndex: -1
    };

    onKeyDown = e => {
        const { key, keyCode, which } = e;
        if (keyCode === '40' || which === '40' || key === 'ArrowDown') {
            this.setState(({ highlightedIndex }) => {
                const withinBoundsOfDefaultDropdown =
                    !this.props.showHierarchicalDropdown && highlightedIndex < this.props.suggestions.length - 1;
                const withinBoundsOfHierarchicalDropdown =
                    this.props.showHierarchicalDropdown && highlightedIndex < this.getTotalAmountOfSuggestionsInHierarchicalData() - 1;
                if (withinBoundsOfDefaultDropdown || withinBoundsOfHierarchicalDropdown) {
                    return { highlightedIndex: (highlightedIndex += 1) };
                }
            });
        } else if (keyCode === '38' || which === '38' || key === 'ArrowUp') {
            this.setState(({ highlightedIndex }) => {
                if (highlightedIndex > -1) {
                    return { highlightedIndex: (highlightedIndex -= 1) };
                }
            });
        }
    };

    setHighlightedIndex = index => {
        this.setState({
            highlightedIndex: index
        });
    };

    onInputSubmit = value => {
        const { highlightedIndex } = this.state;
        if (highlightedIndex < 0) {
            this.props.onSelect(value);
        } else if (!this.props.showHierarchicalDropdown) {
            this.props.onSelect(this.props.suggestions[highlightedIndex]);
        } else if (this.props.showHierarchicalDropdown) {
            const item = this.getItemFromHierarchicalDropdownByIndex(highlightedIndex);
            this.props.onSelect(item);
        }
    };

    onChange = e => {
        this.setState(
            {
                highlightedIndex: -1
            },
            () => this.props.onChange(e)
        );
    };

    getTotalAmountOfSuggestionsInHierarchicalData() {
        return this.props.suggestions.reduce((acc, curr) => {
            return (acc += curr.items.length);
        }, 0);
    }

    getItemFromHierarchicalDropdownByIndex(index) {
        let acc = 0;
        let item;
        for (let hierarchy of this.props.suggestions) {
            const { items } = hierarchy;
            const { length } = items;
            const startingIndex = acc;
            acc += length;
            if (index < startingIndex + length) {
                item = items[index - startingIndex];
                break;
            }
        }

        return item;
    }

    render() {
        const {
            placeholder,
            onChange,
            suggestions,
            onSelect,
            onSubmit,
            children,
            SuggestionItem,
            showHierarchicalDropdown,
            renderSuggestion,
            ...htmlAttributes
        } = this.props;
        const { isDropdownShown } = !!suggestions.length;
        const { highlightedIndex } = this.state;
        if (typeof children === 'function') {
            return this.props.children({
                highlightedIndex,
                onKeyDown: this.onKeyDown,
                setHighlightedIndex: this.setHighlightedIndex,
                onInputSubmit: this.onInputSubmit,
                onChange: this.onChange
            });
        }

        return (
            <div
                className="vdp-typeahead"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isDropdownShown}
                onKeyDown={this.onKeyDown}
                {...htmlAttributes}>
                <SearchField placeholder={placeholder} onSubmit={this.onInputSubmit} onChange={this.onChange} />
                <ul className="vdp-suggestion-list">
                    {showHierarchicalDropdown ? (
                        TypeAhead.getHierarchicalDropdown(
                            suggestions,
                            SuggestionItem,
                            onSelect,
                            highlightedIndex,
                            this.setHighlightedIndex,
                            renderSuggestion
                        )
                    ) : (
                        <TypeAhead.DropDown
                            {...{
                                suggestions,
                                SuggestionItem,
                                onSelect,
                                highlightedIndex,
                                setHighlightedIndex: this.setHighlightedIndex,
                                renderSuggestion
                            }}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

TypeAhead.propTypes = {
    suggestions: PropTypes.array
};

TypeAhead.defaultProps = {
    suggestions: [],
    renderSuggestion: defaultRenderSuggestion
};

export default TypeAhead;
