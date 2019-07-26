import React from 'react';
import SearchField from './SearchField';
import Subhead from '../atoms/Subhead';

class TypeAhead extends React.Component {
    static getHierarchicalDropdown = (suggestions, SuggestionItem, onSelect, highlightedIndex) =>
        suggestions.map((hierarchy, index) => {
            return (
                !!hierarchy.items.length && (
                    <div className="vdp-type-ahead__section" id={hierarchy.title}>
                        <div className="vdp-type-ahead__section__header">
                            <Subhead inverted>{hierarchy.title}</Subhead>
                        </div>
                        {TypeAhead.getDropDown(hierarchy.items, SuggestionItem, onSelect, highlightedIndex * (index + 1))}
                    </div>
                )
            );
        });

    static getDropDown = (suggestions, SuggestionItem, onSelect, highlightedIndex) => (
        <div className="vdp-type-ahead__suggestions">
            {suggestions.map((item, index) => {
                if (typeof item === 'string') {
                    return (
                        <div className="vdp-type-ahead-suggestion" onClick={() => onSelect(item)} id={item}>
                            {highlightedIndex === index ? '*' : null}
                            {item}
                        </div>
                    );
                }

                return <SuggestionItem key={item} onClick={() => onSelect(item)} suggestion={item} />;
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
                return { highlightedIndex: (highlightedIndex += 1) };
            });
        } else if (keyCode === '38' || which === '38' || key === 'ArrowUp') {
            this.setState(({ highlightedIndex }) => {
                if (highlightedIndex > -1) {
                    return { highlightedIndex: (highlightedIndex -= 1) };
                }
            });
        }
    };

    onSearchFieldSubmit = value => {
        const { highlightedIndex } = this.state;
        if (highlightedIndex < 0) {
            this.props.onSelect(value);
        } else if (!this.props.showHierarchicalDropdown && highlightedIndex >= 0) {
            this.props.onSelect(this.props.suggestions[highlightedIndex]);
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
    render() {
        const {
            placeholder,
            Dropdown,
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
            return this.props.children();
        }

        return (
            <div
                className="vdp-typeahead"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isDropdownShown}
                onKeyDown={this.onKeyDown}
                {...htmlAttributes}>
                <SearchField placeholder={placeholder} onSubmit={this.onSearchFieldSubmit} onChange={this.onChange} />
                <ul className="vdp-suggestion-list">
                    {showHierarchicalDropdown
                        ? TypeAhead.getHierarchicalDropdown(suggestions, SuggestionItem, onSelect, highlightedIndex)
                        : TypeAhead.getDropDown(suggestions, SuggestionItem, onSelect, highlightedIndex)}
                </ul>
            </div>
        );
    }
}

TypeAhead.defaultProps = {
    suggestions: []
};

export default TypeAhead;
