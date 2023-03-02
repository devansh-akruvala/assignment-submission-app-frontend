import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useLocalState } from "../util/useLocalStorage";

const Login = () => {


  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setusername] = useState("");
  const [password, setpasword] = useState("");
  
  const sendLoginRequest = (e) => {
    e.preventDefault();

    fetch("api/auth/login", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else {
          return Promise.reject("Invalid");
        }
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href="/dashboard"
      })
      .catch((message) => {
        alert(message);
      });
  };

  const changeUsername = (e) => {
    setusername(e.target.value);
  };
  const changePassword = (e) => {
    setpasword(e.target.value);
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="6" lg="8">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                value={username}
                onChange={changeUsername}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6" lg="8">
            <Form.Group>
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                value={password}
                onChange={changePassword}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6" lg="8" className="mt-3 d-flex flex-column gap-4 flex-md-row justify-content-md-around">
            <Button
              size="lg"
              variant="primary"
              type="submit"
              onClick={sendLoginRequest}
            >
              Login
            </Button>
            <Button
              size="lg"
              variant="secondary"
              type="submit"
              onClick={() => {
                window.location.href="/"
              }}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
