import React from 'react';
import { shallow, mount } from 'enzyme';
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

    it('renders a large button', () => {
        const wrapper = shallow(<Button size="large" />);
        expect(wrapper.find('.vp-button').hasClass('--large')).toBe(true);
    });

    it('renders a primary button', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.find('.vp-button').hasClass('--secondary', '--tertiary')).toBe(false);
    });

    it('renders a secondary button', () => {
        const wrapper = shallow(<Button importance={'secondary'} />);
        expect(wrapper.find('.vp-button').hasClass('--secondary')).toBe(true);
    });

    it('renders a tertiary button', () => {
        const wrapper = shallow(<Button importance={'tertiary'} />);
        expect(wrapper.find('.vp-button').hasClass('--tertiary')).toBe(true);
    });

    it('renders grouped buttons', () => {
        const wrapper = mount(
            <React.Fragment>
                <Button grouped>Grouped Button</Button>
                <Button grouped>Grouped Button</Button>
            </React.Fragment>
        );
        expect(wrapper.find('.vp-grouped-button').length).toBe(2);
    });

    it('handles onClick event', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<Button size="small" onClick={mockOnClick} />);
        wrapper.find('.vp-button').simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('prevents onClick when button is disabled', () => {
        const mockOnClick = jest.fn();
        const wrapper = mount(<Button size="small" disabled onClick={mockOnClick} />);
        wrapper.find('.vp-button').simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(0);
    });

    it('handles onMouseOver event', () => {
        const mockOnClick = jest.fn();
        const wrapper = mount(<Button size="small" onMouseOver={mockOnClick} />);
        wrapper.find('.vp-button').simulate('mouseover');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles onMouseOut event', () => {
        const mockOnClick = jest.fn();
        const wrapper = mount(<Button size="small" onMouseOut={mockOnClick} />);
        wrapper.find('.vp-button').simulate('mouseout');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur event', () => {
        const mockOnClick = jest.fn();
        const wrapper = mount(<Button size="small" onBlur={mockOnClick} />);
        wrapper.find('.vp-button').simulate('blur');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('handles onFocus event', () => {
        const mockOnClick = jest.fn();
        const wrapper = mount(<Button size="small" onFocus={mockOnClick} />);
        wrapper.find('.vp-button').simulate('focus');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
