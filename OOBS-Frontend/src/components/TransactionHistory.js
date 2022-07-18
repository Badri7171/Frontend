import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import DashboardAdmin from "./DashboardAdmin";
import { baseUrl } from "./configurations";

function TransactionHistory(props) {
  const [data, setData] = useState([]);
  const [fromDate,setFromDate] = useState(null);
  const [toDate,setToDate] = useState(null);


  const apiUrl = `${baseUrl}TransactionHistory`;

  useEffect(() => {
    debugger;
   
    const data = {
      FromAccount: "",
      Type: "Admin",
      FromDate: "fromDate",
      ToDate: "toDate"
    };
    axios.post(apiUrl, data).then((result) => {
      debugger;
      if (result && result.data && result.data.listTransactionHistory != undefined) {
        setData(result.data.listTransactionHistory);
      } else {
        alert("No data available.");
      }
    });
  }, []);

  const handleSearch = () => {
    const data = {
      FromAccount: "",
      Type: "Admin",
      FromDate: fromDate,
      ToDate: toDate
    };
    axios.post(apiUrl, data).then((result) => {
      debugger;
      if (result && result.data && result.data.listTransactionHistory != undefined) {
        if(result.data.listTransactionHistory.length > 0)
        setData(result.data.listTransactionHistory);
        else
        {
          setData([])
          alert("No data available.");
        }
      } else {
        alert("No data available.");
      }
    });
  };

  return (
    <div className="animated fadeIn">
      <DashboardAdmin />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> <h3> Transaction History</h3>
              <br></br>
              <input
                type="date"
                placeholder="Date From"
                onChange={(e) => setFromDate(e.target.value)}
                value={fromDate}
              />
              &nbsp;&nbsp;&nbsp;
              <input
                type="date"
                placeholder="Date To"
                onChange={(e) => setToDate(e.target.value)}
                value={toDate}
                
              />
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary mb-1" onClick={() => handleSearch()}>Search</button>
            </CardHeader>
            <CardBody>
              {
                data && data.length > 0 ?                
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Transaction From Account</th>
                    <th>Transaction To Account</th>
                    <th>Transaction Amount</th>
                    <th>Transaction Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{item.FromAccount}</td>
                          <td>{item.ToAccount}</td>
                          <td>{item.Amount}</td>
                          <td>{item.TransactionDate}</td>                          
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              : 
              <h4>Loading / No Data Available</h4>
            }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TransactionHistory;
