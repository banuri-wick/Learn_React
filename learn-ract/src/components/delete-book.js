import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const DeleteBook = (props) => {
  //#region States
  const [isDeleted, setDeleteState] = useState(false);
  //#endregion

  //#region Functions
  const deleteHandler = () => {
    sendAPICall();
    props.modalHandler(false, isDeleted);
  };

  const closeModal = () => {
    props.modalHandler(false, isDeleted);
  };

  const sendAPICall = () => {
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(
      `https://localhost:7063/api/deleteBook?id=${props.deleteBookId}`,
      request
    )
      .then((response) => {
        if (response.status === "200") {
          setDeleteState(true);
        } else {
          setDeleteState(false);
        }
      })
      .catch((err) => console.error(err));
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
