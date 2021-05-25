import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Nav/Navbar";
import Home from "./Pages";
import SolutionsController from "./Pages/SolutionsController";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/solutions" component={SolutionsController} />
      </Switch>
    </Router>
  );
}

export default App;
