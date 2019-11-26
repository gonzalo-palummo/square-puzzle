import React from "react";
import "./ModalDialog.css";
import { Modal } from "react-bootstrap";
import { get } from "../../services/MultilingualService";

function ModalDialog(props) {
  return (
    <div>
      <Modal show={props.isOpen} onHide={props.onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className="h5 text-black">{props.title}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <button
            onClick={props.onRequestClose}
            className="btn btn-sm btn-secondary my-2 border-rounded"
          >
            {get("close")}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDialog;
