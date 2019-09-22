import React from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  isVisible: boolean;
  title: string;
  doneBtnText: string;
  isDoneDisabled: boolean;
  children: React.ReactNode;

  onDone(): void;
  onClose(): void;
}

const ModalComponent = ({ isVisible, title, doneBtnText, isDoneDisabled, onDone, onClose, children }: Props) => {
  const portalRootNode = document.getElementById('portal');
  const handleClose = () => {
    onClose();
  };
  const handleDone = () => {
    onDone();
  };

  if (portalRootNode === null) {
    return null;
  }

  return createPortal(
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDone} disabled={isDoneDisabled}>
          {doneBtnText}
        </Button>
      </Modal.Footer>
    </Modal>,
    portalRootNode
  );
};

const WithObserver = observer(ModalComponent);

export { WithObserver as Modal };
