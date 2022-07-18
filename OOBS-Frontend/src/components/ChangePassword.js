import React, {  useState } from "react";
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
import Dashboard from "./Dashboard";
import { baseUrl } from "./configurations";

function ChangePassword(props) {

  const [userDetails, setUserDetails] = useState({
    EmailId: "",
    Password: "",
  });
  const apiUrl = `${baseUrl}ResetPassword`;

  const ResetPassword = (e) => {
    debugger
    e.preventDefault();
    const data = {
      EmailId: userDetails.EmailId,
      Password: userDetails.Password,
    };
    axios.post(apiUrl, data).then((result) => {
      if (
        result &&
        result.data.StatusCode !== undefined &&
        result.data.StatusCode === 200
      ) {
        alert(result.data.Message);
      } else {
        alert("Error occured. Try after sometime.");
      }
      setUserDetails({ EmailId: "", Password: "" });
    });
  };

  const onChange = (e) => {
    e.persist();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="app flex-row align-items-center">
        <Dashboard />
        <br></br>
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={ResetPassword}>
                  <h1>Forgot Password</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmailId"
                      id="EmailId"
                      placeholder="Email Id"
                      value={userDetails.EmailId}
                      onChange={onChange}
                    />  
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="Password"
                      id="Password"
                      value={userDetails.Password}
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
                          <span>Submit</span>
                        </Button>
                      </Col>                      
                      <Col xs="8" sm="4">
                        <Button className="btn btn-primary mb-1" block>
                          <span>Cancel</span>
                        </Button>
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

export default ChangePassword;
