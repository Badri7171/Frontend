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
import Dashboard from "./Dashboard";

function Transfer(props) {
  const [userDetails, setUserDetails] = useState({
    FromAccount: "",
    ToAccount: "",
    Amount: 0,
  });
  const apiUrl = `${baseUrl}Transaction`;

  const TransferAmount = (e) => {
    e.preventDefault();
    debugger;
    const data = {
      FromAccount: userDetails.FromAccount,
      ToAccount: userDetails.ToAccount,
      Amount: userDetails.Amount,
    };
    axios.post(apiUrl, data).then((result) => {
      if (
        result &&
        result.data.StatusCode !== undefined &&
        result.data.StatusCode === 200
      ) {
        alert("Transaction completed successfully.");
      } else {
        alert("Error occured. Try after sometime.");
      }

      setUserDetails({ FromAccount: "", ToAccount: "", Amount : 0 });
    });
  };

  const onChange = (e) => {
    e.persist();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };


  return (
    <div className="app flex-row align-items-center">
        <Dashboard />
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={TransferAmount}>
                  <h1>Transfer Amount</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="FromAccount"
                      id="FromAccount"
                      placeholder="From Account"
                      onChange={onChange}
                      value={userDetails.FromAccount}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="To Account"
                      name="ToAccount"
                      id="ToAccount"
                      onChange={onChange}
                      value={userDetails.ToAccount}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      name="Amount"
                      id="Amount"
                      onChange={onChange}
                      value={userDetails.Amount}
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

export default Transfer;
