import React from "react";
import { Modal, Button } from "react-bootstrap";

export const DeleteBook = (props) => {
  //#region Functions
  const deleteHandler = () => {
    console.log("DELETED!");
    props.modalHandler(false);
  };

  const closeModal = () => {
    props.modalHandler(false);
  };
  //#endregion

  return (
    <div>
      <Modal show={props.isVisibleDeleteBook}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={closeModal}>
            NO
          </Button>
          <Button variant="dark" onClick={deleteHandler}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
