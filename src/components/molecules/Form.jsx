// Inspired by the formsy library
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const FormContext = React.createContext({});

FormContext.propTypes = {
    children: PropTypes.node
};

function FormContextConsumer(props) {
    return (
        <FormContext.Consumer {...props}>
            {context => {
                if (!context) {
                    console.error('Form.Context Consumer must be rendered as a child of the Form sub tree');
                    return null;
                }

                return props.children(context);
            }}
        </FormContext.Consumer>
    );
}

class Form extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        /** Custom callback when validation fails on the form. Takes in the dom component with the highest error as a parameter */
        onValidationFailure: PropTypes.func,
        /** Whether or not to automatically scroll to the top form error. Not supported on all devices */
        scrollToTopError: PropTypes.bool,
        children: PropTypes.node
    };

    static defaultProps = {
        onSubmit: () => {},
        onValidationFailure: () => {},
        scrollToTopError: true
    };

    static ContextConsumer = FormContextConsumer;
    inputs = [];

    setForm = ref => {
        this.inputs.push(ref);
    };

    afterValidation = highestErrorComponent => {
        const isFormValid = this.inputs.every(input => !input.state.error);
        const { onSubmit, onValidationFailure } = this.props;
        if (isFormValid) {
            onSubmit();
        } else {
            onValidationFailure(highestErrorComponent);
        }
    };

    validate = () => {
        let highestErrorComponent;
        let highestErrorPosition = Infinity;
        this.inputs.forEach((component, index) => {
            // TODO: update form component library to also have refs in form elements so we dont have to use ReactDom.findDomNode
            /* eslint react/no-find-dom-node: 0 */
            const componentDomNode = ReactDOM.findDOMNode(component);
            const error = this.validateInput(component);
            if (componentDomNode && !!error) {
                const position = componentDomNode.getBoundingClientRect().top;
                if (position < highestErrorPosition) {
                    highestErrorComponent = componentDomNode;
                    highestErrorPosition = position;
                }
            }
            component.setState(
                {
                    error
                },
                index === this.inputs.length - 1 ? () => this.afterValidation(highestErrorComponent) : null
            );
        });

        if (this.props.scrollToTopError && highestErrorComponent && highestErrorComponent.scrollIntoView) {
            highestErrorComponent.scrollIntoView();
        }
    };

    validateInput = component => {
        let componentValue;

        const { state, props } = component;
        if (state.checked) {
            componentValue = state.checked;
        } else if (props.checked) {
            componentValue = props.checked;
        } else {
            componentValue = state.value;
        }
        return props.validationMethod(componentValue);
    };

    onSubmit = e => {
        e.preventDefault();
        this.validate();
    };

    render() {
        const { props, setForm } = this;

        // pull out htmlAttributes from props and pass them to the dom element
        const { onSubmit, onValidationFailure, scrollToTopError, ...htmlAttributes } = props;
        return (
            <form {...{ onSubmit: this.onSubmit, ...htmlAttributes }}>
                <FormContext.Provider value={{ setForm }}>{props.children}</FormContext.Provider>
            </form>
        );
    }
}

export default Form;
