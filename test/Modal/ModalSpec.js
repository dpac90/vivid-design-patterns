import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from '../../src/components/molecules/Modal';

describe('<Modal />', () => {
    it('renders an <aside> element', () => {
        const wrapper = shallow(<Modal dataState="opened" />);
        expect(wrapper.find('aside').hasClass('vp-modal')).toBe(true);
    });

    it('does not render a component without dataState prop', () => {
        const wrapper = mount(<Modal />);
        expect(wrapper.exists('.vp-modal')).toBe(false);
    });

    it('should have a backdrop', () => {
        const wrapper = mount(<Modal dataState="opened" />);
        expect(wrapper.exists('.vp-backdrop')).toBe(true);
    });

    it('should have a backdrop disabled when specified', () => {
        const wrapper = mount(<Modal dataState="opened" disableBackdrop />);
        expect(wrapper.exists('.vp-backdrop')).toBe(false);
    });

    it('can be a sheet modal', () => {
        const wrapper = mount(<Modal dataState="opened" type="sheet" />);
        expect(wrapper.exists('.vp-modal--sheet')).toBe(true);
    });

    it('can be dismissed by clicking the dismiss button', done => {
        const mockOnClose = jest.fn();
        const wrapper = mount(<Modal dataState="opened" onClose={mockOnClose} />);
        wrapper.find('.vp-button').simulate('click');

        setTimeout(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
            expect(wrapper.state('dataState')).toEqual('closed');
            done();
        }, 750);
    });

    it('can be dismissed by clicking on the backdrop', done => {
        const mockOnClose = jest.fn();
        const wrapper = mount(<Modal dataState="opened" onClose={mockOnClose} />);
        wrapper.find('.vp-backdrop').simulate('click');

        setTimeout(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
            expect(wrapper.state('dataState')).toEqual('closed');
            done();
        }, 750);
    });
});
