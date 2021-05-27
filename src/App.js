import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Nav/Navbar";
import Home from "./Pages";
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
      </Switch>
    </Router>
  );
}

export default App;
