import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const [isAddedNewBook, setBook] = useState(false);
  const [isDeletedBook, setBookDeleteState] = useState(false);
  const [bookState, setBookState] = useState(null);
  const [deleteBookId, setBookIdToDelete] = useState(null);
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
          id: null,
          name: "",
          author: "",
          price: 0,
        },
      });
      setBook(false);
    } else {
      setBook(true);
    }
  };

  const manageBookHander = (x, isUpdate) => {
    setBookState({
      isUpdate: isUpdate,
      state: {
        id: x.id,
        name: x.name,
        author: x.author,
        price: x.price,
      },
    });
    openBookModal(true);
  };
  //#endregion

  //#region Delete book
  const openDeleteBookModal = (isModalOpen, isDeleted) => {
    setBookDeleteState(isDeleted);
    setVisibilityForDeleteBookModal(isModalOpen);
  };

  const deleteBookHander = (x) => {
    setBookIdToDelete(x);
    openDeleteBookModal(true);
  };
  //#endregion

  const getAllBooks = () => {
    fetch("https://localhost:7063/api/getAllBooks")
      .then((res) => res.json())
      .then((bookList) => setData(bookList));
  };
  //#endregion

  //#region React Hooks
  let location = useLocation();

  useEffect(() => {
    getAllBooks();
  }, [isAddedNewBook, isDeletedBook]);
  //#endregion

  return (
    <div>
      <h1 className="user"> Hi {location.state.credentials.username}!</h1>
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
                <th>Book name</th>
                <th>Author</th>
                <th>Unit price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.name}</td>
                    <td>{x.author}</td>
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
            deleteBookId={deleteBookId}
            modalHandler={(isModalOpen, isDeleted) =>
              openDeleteBookModal(isModalOpen, isDeleted)
            }
          />
        )}
      </Card>
    </div>
  );
};
