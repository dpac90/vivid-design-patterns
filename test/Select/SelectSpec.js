import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from '../../src/components/molecules/Select';
import Form from '../../src/components/molecules/Form';
import Input from '../../src/components/atoms/Input';
import Button from '../../src/components/atoms/Button';

describe('<Select />', () => {
    const mockOnChange = jest.fn();
    const mockValidationMethod = jest.fn();
    const selectComponent = (
        <Select onChange={mockOnChange} validationMethod={mockValidationMethod}>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
        </Select>
    );

    it('renders a select component with options', () => {
        const wrapper = mount(selectComponent);
        expect(wrapper.find('select').hasClass('vp-select__control')).toBe(true);
        expect(wrapper.find('option').length).toBeGreaterThanOrEqual(3);
    });

    it('calls onchange when you select an option', () => {
        const wrapper = mount(selectComponent);
        wrapper.find('select').simulate('change');
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    describe('should handle validation', () => {
        const mockOnSubmit = jest.fn();
        const selectComponentInForm = (
            <Form onSubmit={mockOnSubmit}>
                <Form.ContextConsumer>
                    {({ setForm }) => (
                        <React.Fragment>
                            <Select ref={setForm} validationMethod={mockValidationMethod}>
                                <Select.Option value={1}>1</Select.Option>
                                <Select.Option value={2}>2</Select.Option>
                            </Select>
                            <Button type="submit">Submit</Button>
                        </React.Fragment>
                    )}
                </Form.ContextConsumer>
            </Form>
        );

        it('should call the validation method onChange', () => {
            const wrapper = mount(selectComponent);
            wrapper.find('select').simulate('change');
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockValidationMethod).toHaveBeenCalledTimes(1);
        });

        it('should call its validationMethod when the form submits', () => {
            const wrapper = mount(selectComponentInForm);
            wrapper.find('form').simulate('submit');
            expect(mockValidationMethod).toHaveBeenCalled();
        });
    });
});
