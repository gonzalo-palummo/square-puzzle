import React from "react";
import "./ModalDialog.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function ModalDialog(props) {
  return (
    <div>
      <Modal show={props.isOpen} onHide={props.onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Link to="/" className="btn btn-secondary my-2 border-rounded">
            Close
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDialog;
