import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from '../../src/components/molecules/Modal';

describe('<Modal />', () => {
    it('renders an <aside> element', () => {
        const wrapper = shallow(<Modal />);
        expect(wrapper.find('aside').hasClass('vp-modal')).toBe(true);
    });

    it('should have a backdrop', () => {
        const wrapper = mount(<Modal />);
        expect(wrapper.exists('.vp-backdrop')).toBe(true);
    });

    it('should have a backdrop disabled when specified', () => {
        const wrapper = mount(<Modal disableBackdrop={true} />);
        expect(wrapper.exists('.vp-backdrop')).toBe(false);
    });

    it('can be dismissed', done => {
        const mockOnClose = jest.fn();
        const wrapper = mount(<Modal dataState="opened" onClose={mockOnClose} />);
        wrapper.find('.vp-button').simulate('click');

        setTimeout(() => {
            expect(mockOnClose).toHaveBeenCalledTimes(1);
            expect(wrapper.state('dataState')).toEqual('closed');
            done();
        }, 750);
    });
});
