
import React from "react";
import {Switch, Route} from "react-router-dom";
import { useAppState } from "./components/AppState";

import Nav from "./components/nav";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard.jsx";
import Footer from "./components/footer";
import './App.css';


function App(props) {

  const { state, dispatch } = useAppState();
  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"))
    if (auth) {
      dispatch({type: "auth", payload: auth})
      props.history.push("/dashboard")
    } else {
      props.history.push("/")
    }
  }, [])

  return (
    <div className="App">
      <div className="content-wrap">
      <Route path="/" component={Nav} />
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/auth/:form" component={Auth}/>
        <Route path="/dashboard" component={Dashboard}/>
    </Switch>
    <Footer />
    </div>
    </div>
  );
}

export default App;
