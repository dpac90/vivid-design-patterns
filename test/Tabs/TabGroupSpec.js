import React from 'react';
import { shallow } from 'enzyme';
import TabGroup from '../../src/components/molecules/TabGroup';

describe('<TabGroup />', () => {
    it('renders a <nav> tag', () => {
        const wrapper = shallow(<TabGroup />);
        expect(wrapper.find('.vp-tab-group').exists()).toBe(true);
    });

    it('renders a dark themed <nav> tag', () => {
        const wrapper = shallow(<TabGroup dark />);
        expect(wrapper.find('.vp-tab-group').hasClass('--inverted')).toBe(true);
    });
});
