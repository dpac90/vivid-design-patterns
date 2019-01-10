import React from 'react';
import { shallow, mount } from 'enzyme';
import TabGroup from '../../src/components/molecules/TabGroup';
import Tab from '../../src/components/atoms/Tab';

describe('<Tab />', () => {
    const fakeHref = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    it('renders an <a> tag', () => {
        const wrapper = shallow(
            <LinkGroup>
                <Link href={fakeHref} />
            </LinkGroup>
        );
        expect(wrapper.find('a.vp-type-link').exists()).toBe(true);
    });

    it('renders an <a> tag with custom attributes', () => {
        const wrapper = shallow(<Link href={fakeHref} id="myLink" />);
        expect(wrapper.find('#myLink').hasClass('vp-type-link')).toBe(true);
    });

    it('handles onClick event', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<Link href={fakeHref} onClick={mockOnClick} />);
        wrapper.find('.vp-type-link').simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
