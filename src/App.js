import logo from './logo.svg';
import Test from "./components/Test"
import {Switch, Route} from "react-router-dom";
import Nav from "./components/nav";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/auth/:form" component={Auth}/>
        <Route path="/dashboard" component={Dashboard}/>
    </Switch>
    </div>
  );
}

export default App;
