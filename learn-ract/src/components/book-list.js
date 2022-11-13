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
  console.log("2222222222222222222222");
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

  const getAllBooks = () => {
    fetch("https://localhost:7063/api/getAllBooks")
      .then((res) => res.json())
      .then((bookList) => setData(bookList));
  };
  //#endregion

  //#region React Hooks
  useEffect(() => {
    getAllBooks();
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
            manageHandler={getAllBooks}
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
