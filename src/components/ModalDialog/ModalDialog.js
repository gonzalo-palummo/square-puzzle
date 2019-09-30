import React from "react";
import "./ModalDialog.css";
import { Modal } from "react-bootstrap";

function ModalDialog(props) {
  return (
    <div>
      <Modal show={props.isOpen} onHide={props.onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <button
            onClick={props.onRequestClose}
            className="btn btn-secondary my-2 border-rounded"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDialog;
