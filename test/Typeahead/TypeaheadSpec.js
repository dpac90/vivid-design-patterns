import Typeahead from '../../src/components/molecules/Typeahead';
import React from 'react';
import { shallow, mount, extend } from 'enzyme';

describe('<Typeahead />', () => {
    describe('Default typeahead component', () => {
        const getSuggestions = jest.fn();
        const onSelect = jest.fn();
        const component = <Typeahead onChange={getSuggestions} placeholder="Search" onSelect={onSelect} />;
        it('Calls onChange when user starts typing in the input', () => {
            const wrapper = mount(component);
            const input = wrapper.find('input');
            expect(input.exists()).toBe(true);
            input.simulate('change', { target: { value: 'a' } });
            expect(getSuggestions).toBeCalled();
        });

        it('It displays a list of suggestions when suggestions are present', () => {
            const wrapper = mount(component);
            const suggestion = 'Hello';
            wrapper.setProps({ suggestions: [suggestion] });
            expect(wrapper.find('.vdp-typeahead__dropdown').exists()).toBe(true);
            const suggestionItem = wrapper.find('.vdp-typeahead__suggestion');
            expect(suggestionItem.text()).toBe(suggestion);
            suggestionItem.simulate('click');
            expect(onSelect).toBeCalledWith(suggestion);
        });
    });
});
