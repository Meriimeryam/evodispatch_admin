import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Nav/Navbar";
import Home from "./Pages";
import Requests from "./Pages/Requests";
import RequestController from "./Pages/RequestController";
import Solution from "./Pages/Solution";
import SolutionsController from "./Pages/SolutionsController";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/solutions" component={SolutionsController} />
        <Route path="/add-solutions" component={Solution} />
        <Route path="/request" component={RequestController} />
        <Route path="/view-request" component={Requests} />
      </Switch>
    </Router>
  );
}

export default App;
