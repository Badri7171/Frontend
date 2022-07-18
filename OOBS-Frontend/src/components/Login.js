import React, { useState } from "react";
import axios from "axios";


import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import { baseUrl } from "./configurations";

function Login(props) {
  const [userDetails, setUserDetails] = useState({
    EmailID: "",
    Password: "",
  });
  const apiUrl = `${baseUrl}Login`;

  const LoginUser = (e) => {
    e.preventDefault();
    debugger
    const data = {
      EmailID: userDetails.EmailID,
      Password: userDetails.Password,
    };
    axios.post(apiUrl, data).then((result) => {
      if (
        result &&
        result.data.StatusCode !== undefined &&
        result.data.StatusCode === 200
      ) {
        localStorage.setItem("loggedUser", userDetails.EmailID);
        if (userDetails.EmailID === "admin" && userDetails.Password === "admin")
          props.history.push("/DashboardAdmin");
        else props.history.push("/Dashboard");
      } else {
        alert("Error occured. Try after sometime.");
      }

      setUserDetails({ EmailID: "", Password: "" });
    });
  };

  const onChange = (e) => {
    e.persist();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegistration = () => {
    props.history.push("/Registration");
  };

  return (
    
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={LoginUser}>
                  <h1>Login</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmailID"
                      id="EmailID"
                      placeholder="Email Id"
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="Password"
                      id="Password"
                      onChange={onChange}
                    />
                  </InputGroup>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="8" sm="4">
                        <Button
                          type="submit"
                          className="btn btn-primary mb-1"
                          block
                        >
                          <span>Login</span>
                        </Button>
                      </Col>
                      <Col xs="8" sm="4">
                        <Button
                          className="btn btn-primary mb-1"
                          block
                          onClick={() => handleRegistration()}
                        >
                          <span>Go to Registration</span>
                        </Button>
                      </Col>
                      <Col xs="8" sm="4">
                       
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
}

export default Login;
