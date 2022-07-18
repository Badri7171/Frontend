import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import DashboardAdmin from "./DashboardAdmin";
import { baseUrl } from "./configurations";

function CustomerProfile(props) {
  const [data, setData] = useState([]);
  const [empId, setEmpId] = useState("");
  const apiUrl = `${baseUrl}ListRegistration`;

  useEffect(() => {
    debugger;
    const data = {
      EmailId: "",
      Type: "Admin",
    };
    axios.post(apiUrl, data).then((result) => {
      debugger;
      if (result && result.data && result.data.listRegistration != undefined) {
        setData(result.data.listRegistration);
      } else {
        alert("No data available.");
      }
    });
  }, []);

 
 
  return (
    <div className="animated fadeIn">
      <DashboardAdmin />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> <h3> Employee Details</h3>              
            </CardHeader>
            <CardBody>
              {
                data && data.length > 0 ?                
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                  <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>AadharNo</th>
                    <th>PanCard</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>AccountType</th>
                    <th>PhoneNo</th>
                    <th>EmailID</th>
                    <th>Address</th>
                    <th>InitialAmount</th>
                    <th>Balance</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{item.EmpID}</td>
                          <td>{item.EmpName}</td>
                          <td>{item.AadharNo}</td>
                          <td>{item.PanCard}</td>
                          <td>{item.Gender}</td>
                          <td>{item.DOB}</td>
                          <td>{item.AccountType}</td>
                          <td>{item.PhoneNo}</td>
                          <td>{item.EmailID}</td>
                          <td>{item.Address}</td>
                          <td>{item.InitialAmount}</td>
                          <td>{item.InitialAmount}</td>
                          <td>{item.Password}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              : 
              <h4>Loading</h4>
            }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerProfile;
