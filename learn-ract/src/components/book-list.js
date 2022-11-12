import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/icons.css";
import "../styles/book-list.css";
import { CreateBook } from "./create-book";
import { DeleteBook } from "./delete-book";

export const BookList = () => {
  //#region States
  const [bookList, setData] = useState([]);
  const [bookState, setBookState] = useState(null);
  const [deleteBookState, setBookStateToDelete] = useState(null);
  const [isVisibleManageBook, setVisibilityForManageBookModal] =
    useState(false);
  const [isVisibleDeleteBook, setVisibilityForDeleteBookModal] =
    useState(false);
  //#endregion

  //#region Functions
  //#region Manage book
  const openBookModal = (isVisible) => {
    setVisibilityForManageBookModal(isVisible);

    if (isVisible === false) {
      setBookState({
        isUpdate: false,
        state: {
          name: "",
          author: "",
          price: 0,
          stocksAvailable: 0,
        },
      });
    }
  };

  const manageBookHander = (x, isUpdate) => {
    setBookState({
      isUpdate: isUpdate,
      state: {
        name: x.name,
        author: x.author,
        price: x.price,
        stocksAvailable: x.stocksAvailable,
      },
    });
    openBookModal(true);
  };
  //#endregion

  //#region Delete book
  const openDeleteBookModal = (isVisible) => {
    setVisibilityForDeleteBookModal(isVisible);
  };

  const deleteBookHander = (x) => {
    setBookStateToDelete({
      deleteBookId: x,
    });
    openDeleteBookModal(true);
  };
  //#endregion
  //#endregion

  //#region React Hooks
  useEffect(() => {
    fetch("https://localhost:7063/GetAllBooks")
      .then((res) => res.json())
      .then((bookList) => setData(bookList));
  }, []);
  //#endregion

  return (
    <div>
      <h1 className="title">Book Management System</h1>
      <Card className="custom-card">
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="2x"
          className="icon-add-new"
          onClick={() => openBookModal(true)}
        />
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Book name</th>
                <th>Author</th>
                <th>Availability</th>
                <th>Unit price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.author}</td>
                    <td>{x.stocksAvailable}</td>
                    <td>{x.price}</td>
                    <td>
                      <Row>
                        <Col>
                          <FontAwesomeIcon
                            icon={faPen}
                            size="1x"
                            className="icon-edit"
                            onClick={() => manageBookHander(x, true)}
                          />
                        </Col>
                        <Col>
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="1x"
                            className="icon-delete"
                            onClick={() => deleteBookHander(x.id)}
                          />
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>

        {isVisibleManageBook && (
          <CreateBook
            isVisibleManageBook={isVisibleManageBook}
            bookState={bookState}
            modalHandler={openBookModal}
          />
        )}

        {isVisibleDeleteBook && (
          <DeleteBook
            isVisibleDeleteBook={isVisibleDeleteBook}
            deleteBookState={deleteBookState}
            modalHandler={openDeleteBookModal}
          />
        )}
      </Card>
    </div>
  );
};
