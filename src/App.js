import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Nav/Navbar";
import Requests from "./Pages/Requests";
import RequestController from "./Pages/RequestController";
import Solution from "./Pages/Solution";
import SolutionsController from "./Pages/SolutionsController";
import Links from "./Pages/Links";
import ClientsController from "./Pages/ClientsController";
import Clients from "./Pages/Client";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={RequestController} />
        <Route path="/view-request" component={Requests} />
        <Route path="/solutions" component={SolutionsController} />
        <Route path="/add-solutions" component={Solution} />
        <Route path="/links" component={Links} />
        <Route path="/clients" component={ClientsController} />
        <Route path="/add-client" component={Clients} />
      </Switch>
    </Router>
  );
}

export default App;
