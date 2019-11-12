import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Slider from "./components/slider";
import Coleccion from "./components/coleccion";
import "./App.css";

function App() {
  return (
    <div className="container-fluid px-0">
      <div className="fill">
        <div className="row">
          <div className="col-12 bg-dark">
            <NavBar></NavBar>
          </div>
        </div>
        <div className="row">
          <div className="col-12 min-vh-100">
            <Switch>
              <Route path="/coleccion/:col" component={Coleccion}></Route>
              <Route exact path="/" component={Slider}></Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 bg-dark">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
