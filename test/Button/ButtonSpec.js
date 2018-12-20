import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../src/components/atoms/Button';

/*

-handles on click when clicked
-doesn't call onclick when disabled
-assert mouseover/mouseout/hover
-

 */

describe('<Button />', () => {
    it('renders a small button', () => {
        const wrapper = shallow(<Button size="small" />);
        expect(wrapper.find('.vp-button').hasClass('--small')).toBe(true);
    });

    it('handles onClick event', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<Button size="small" onClick={mockOnClick} />);
        wrapper.find('.vp-button').simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('disables onClick when button is disabled', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<Button size="small" disabled onClick={mockOnClick} />);
        wrapper.find('.vp-button').simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(0);
    });
});
