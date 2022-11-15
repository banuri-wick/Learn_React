import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import "../styles/login.css";
import { useState } from "react";

export const Login = () => {
  //#region States
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  //#endregion

  //#region Functions
  const onControlChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  //#endregion

  //#region React Hooks
  let navigate = useNavigate();
  //#endregion

  return (
    <>
      <Card className="custom-card">
        <Card.Header>Welcome, Please login into system</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Row className="custom-row">
                <Col md={4}>
                  <Form.Label className="custom-label">Username</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={onControlChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Row className="custom-row">
                <Col md={4}>
                  <Form.Label className="custom-label">Password</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={onControlChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer>
          <Row className="login-button-row">
            <Button
              className="login-button"
              onClick={() => navigate("/Books", { state: { credentials } })}
            >
              LOGIN
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
};
