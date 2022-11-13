import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export const CreateBook = (props) => {
  //#region Variables
  const initalFormData = {
    id: null,
    name: "",
    author: "",
    price: 0,
  };
  let latestFormData =
    props.bookState !== null && props.bookState.isUpdate
      ? props.bookState.state
      : initalFormData;
  //#endregion

  //#region States
  const [formData, setFormData] = useState(initalFormData);
  //#endregion

  //#region Functions
  const closeModal = () => {
    props.modalHandler(false);
  };

  const onControlChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createHandler = () => {
    sendAPICall();
    setFormData(initalFormData);
    props.modalHandler(false);
  };

  const sendAPICall = () => {
    console.log("form-data>>> ", formData.id);
    let apiMethod = formData.id !== null ? "PUT" : "POST";
    let url =
      formData.id !== null
        ? "https://localhost:7063/api/updateBook"
        : "https://localhost:7063/api/createBook";

    const requestOptions = {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };
  //#endregion

  //#region React hooks
  useEffect(() => {
    if (props.bookState !== null && props.bookState.isUpdate) {
      setFormData(latestFormData);
    }
  }, [props, latestFormData]);
  //#endregion

  return (
    <div>
      <Modal show={props.isVisibleManageBook}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBookName">
              <Row>
                <Col>
                  <Form.Label>Book Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Enter book name"
                    value={formData.name}
                    onChange={onControlChange}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
              <Row>
                <Col>
                  <Form.Label>Author</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    name="author"
                    value={formData.author}
                    onChange={onControlChange}
                  >
                    <option>Select Author</option>
                    <option value="Author 1">Author 1</option>
                    <option value="Author 2">Author 2</option>
                    <option value="Author 3">Author 3</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Row>
                <Col>
                  <Form.Label>Price</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    name="price"
                    type="numeric"
                    placeholder="Enter unit price"
                    value={formData.price}
                    onChange={onControlChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={closeModal}>
            CANCEL
          </Button>
          <Button variant="dark" onClick={createHandler}>
            SAVE
            {/* {props.bookState.isUpdate !== null && props.bookState.isUpdate
              ? "UPDATE"
              : "ADD"} */}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
