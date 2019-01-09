import React from 'react';

import Modal from '../../src/components/molecules/Modal';
import Button from '../../src/components/atoms/Button';
import Backdrop from '../../src/components/atoms/Backdrop';

class ModalButtonExample extends React.Component {
    state = {
        opened: false
    };

    onClick = opened => {
        this.setState({ opened });
    };

    render() {
        const { state, onClick } = this;

        return (
            <React.Fragment>
                <Button onClick={() => onClick(true)}>Click</Button>
                <Modal opened={state.opened} Backdrop={<Backdrop />}>
                    <Modal.Header>Modal Header</Modal.Header>
                    <Modal.Body>
                        <p className="vp-type-body2 mb-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => onClick(false)} muted={true}>
                            Dismiss
                        </Button>
                        <Button onClick={() => onClick(false)}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ModalButtonExample;
