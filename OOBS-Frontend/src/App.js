import './App.css';
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ChangePassword from './components/ChangePassword'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProfile from './components/MyProfile';
import DashboardAdmin from './components/DashboardAdmin';
import CustomerProfile from './components/CustomerProfile';
import Transfer from './components/Transfer';
import TransactionHistory from './components/TransactionHistory';
import TransactionHistoryEmp from './components/TransactionHistoryEmp';

function App() {
  return (
    <div className="App">
    <Router>        
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Registration" component={Registration} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/ChangePassword" component={ChangePassword} />
          <Route exact path="/MyProfile" component={MyProfile} />
          <Route exact path="/DashboardAdmin" component={DashboardAdmin} />
          <Route exact path="/CustomerProfile" component={CustomerProfile} />
          <Route exact path="/Transfer" component={Transfer} />
          <Route exact path="/TransactionHistory" component={TransactionHistory} />
          <Route exact path="/TransactionHistoryEmp" component={TransactionHistoryEmp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
