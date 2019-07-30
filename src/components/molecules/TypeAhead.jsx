import React from 'react';
import SearchField from './SearchField';
import Subhead from '../atoms/Subhead';

class TypeAhead extends React.Component {
    static getHierarchicalDropdown = (suggestions, SuggestionItem, onSelect, highlightedIndex, setHighlightedIndex) => {
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
                        {TypeAhead.getDropDown(items, SuggestionItem, onSelect, highlightedIndex, setHighlightedIndex, startingIndex)}
                    </div>
                )
            );
        });
    };

    static getDropDown = (suggestions, SuggestionItem, onSelect, highlightedIndex, setHighlightedIndex, startingIndex = 0) => (
        <div className="vdp-type-ahead__suggestions">
            {suggestions.map((item, index) => {
                const absoluteIndex = index + startingIndex;
                const isHighlighted = highlightedIndex === absoluteIndex;
                if (typeof item === 'string') {
                    return (
                        <div
                            className={`vdp-type-ahead-suggestion${isHighlighted ? '--highlight' : null}`}
                            onClick={() => onSelect(item)}
                            key={item}
                            onMouseEnter={() => setHighlightedIndex(absoluteIndex)}>
                            {isHighlighted ? '*' : null}
                            {item}
                        </div>
                    );
                }

                return (
                    <div onClick={() => onSelect(item)} onMouseEnter={() => setHighlightedIndex(absoluteIndex)}>
                        <SuggestionItem key={item.id} suggestion={item} isHighlighted={isHighlighted} />
                    </div>
                );
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
                    {showHierarchicalDropdown
                        ? TypeAhead.getHierarchicalDropdown(
                              suggestions,
                              SuggestionItem,
                              onSelect,
                              highlightedIndex,
                              this.setHighlightedIndex
                          )
                        : TypeAhead.getDropDown(suggestions, SuggestionItem, onSelect, highlightedIndex, this.setHighlightedIndex)}
                </ul>
            </div>
        );
    }
}

TypeAhead.defaultProps = {
    suggestions: []
};

export default TypeAhead;
