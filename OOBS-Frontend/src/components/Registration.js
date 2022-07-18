import React, { useEffect, useState } from "react";
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

function Registration(props) {
  const [AadharNo, SetAadharNo] = useState(null);
  const [PanCard, SetPanCard] = useState("");
  const [EmpID, SetEmpID] = useState("");
  const [EmpName, SetEmpName] = useState("");
  const [Gender, SetGender] = useState("");
  const [DOB, SetDOB] = useState("");
  const [AccountType, SetAccountType] = useState("");
  const [PhoneNo, SetPhoneNo] = useState("");
  const [EmailID, SetEmailID] = useState("");
  const [Address, SetAddress] = useState("");
  const [Password, SetPassword] = useState("");

  const apiUrl = `${baseUrl}Registration`;

  const AddNewUser = (e) => {
    e.preventDefault();
    const data = {
      AadharNo: AadharNo,
      PanCard: PanCard,
      EmpID: EmpID,
      EmpName: EmpName,
      Gender: Gender,
      DOB: DOB,
      AccountType: AccountType,
      PhoneNo: PhoneNo,
      EmailID: EmailID,
      Address: Address,
      Password: Password,
    };
    axios.post(apiUrl, data).then((result) => {
      debugger;
      if (
        result &&
        result.data.StatusCode !== undefined &&
        result.data.StatusCode === 200
      ) {
        alert(result.data.Message);
      } else {
        alert("Error occured. Try after sometime.");
      }
      clear();
    });
  };

  const onAadharNoChange = (value) => {
    SetAadharNo(value);
  };
  const onPanCardChange = (value) => {
    SetPanCard(value);
  };
  const onEmailIDChange = (value) => {
    SetEmailID(value);
  };
  const onEmpNameChange = (value) => {
    SetEmpName(value);
  };
  const onGenderChange = (value) => {
    SetGender(value);
  };
  const onDOBChange = (value) => {
    SetDOB(value);
  };

  const onPhoneNoChange = (value) => {
    SetPhoneNo(value);
  };

  const onAddressChange = (value) => {
    SetAddress(value);
  };
  const onPasswordChange = (value) => {
    SetPassword(value);
  };

  const clear = () => {
    SetAadharNo("");
    SetPanCard("");
    SetEmailID("");
    SetEmpName("");
    SetGender("");
    SetDOB("");
    SetPhoneNo("");
    SetAddress("");
    SetPassword("");
    generateEmpID();
  };

  const handleLogin = () => {
    props.history.push("/");
  };

  const generateEmpID = () => {
    var add = 1,
      max = 12 - add;
    max = Math.pow(10, 7 + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    SetEmpID(("" + number).substring(add));
    SetAccountType("Salary");
  };

  useEffect(() => {
    generateEmpID();
  }, []);

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={AddNewUser}>
                  <h1>Employee Registration</h1>
                  <InputGroup className="mb-3">
                    <Input
                      type="number"
                      name="AadharNo"
                      id="AadharNo"
                      placeholder="AadharNo"
                      value={AadharNo}
                      onChange={(e) => onAadharNoChange(e.target.value)}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 12))
                      }
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="PanCard"
                      id="PanCard"
                      placeholder="PanCard"
                      value={PanCard}
                      onChange={(e) => onPanCardChange(e.target.value)}
                      maxLength="10"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmpID"
                      id="EmpID"
                      placeholder="Employee ID"
                      value={EmpID}
                      disabled
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmpName"
                      id="EmpName"
                      placeholder="Employee Name"
                      value={EmpName}
                      onChange={(e) => onEmpNameChange(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    Gender : &nbsp;
                    <Input
                      type="radio"
                      name="gender"
                      id="rbtnMale"
                      onChange={() => onGenderChange("male")}
                    />{" "}
                    &nbsp;&nbsp; Male&nbsp;&nbsp;
                    <Input
                      type="radio"
                      name="gender"
                      id="rbtnFemale"
                      onChange={() => onGenderChange("female")}
                    />{" "}
                    &nbsp;&nbsp; Female
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="date"
                      name="DOB"
                      id="DOB"
                      placeholder="Date of Birth"
                      value={DOB}
                      onChange={(e) => onDOBChange(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="AccountType"
                      id="AccountType"
                      placeholder="AccountType"
                      value={AccountType}
                      disabled
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="PhoneNo"
                      id="PhoneNo"
                      placeholder="PhoneNo"
                      value={PhoneNo}
                      onChange={(e) => onPhoneNoChange(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="EmailID"
                      id="EmailID"
                      placeholder="EmailID"
                      value={EmailID}
                      onChange={(e) => onEmailIDChange(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="Address"
                      id="Address"
                      placeholder="Address"
                      value={Address}
                      onChange={(e) => onAddressChange(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="password"
                      placeholder="Password"
                      name="Password"
                      id="Password"
                      value={Password}
                      onChange={(e) => onPasswordChange(e.target.value)}
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
                        <Button
                          className="btn btn-primary mb-1"
                          block
                          onClick={() => handleLogin()}
                        >
                          <span>Go to Login</span>
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

export default Registration;
