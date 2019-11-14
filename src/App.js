import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Slider from "./components/slider";
import Coleccion from "./components/coleccion";
import "./App.css";

function App() {
  return (
    <div className="container-fluid  px-0 mx-0 min-vh-100 ">
      <div className="row panel w-100 mx-0 px-0  min-vh-100 no-gutters">
        <div className="col-12 fixed-top">
          <NavBar></NavBar>
        </div>

        <div className="col-12  min-vh-100 mx-0 px-0 ">
          <Switch>
            <Route path="/coleccion/:col" component={Coleccion} />
            <Route exact path="/" component={Slider} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
      <div className="row  w-100 mx-0">
        <Footer></Footer>
      </div>
    </div>
  );

  /* <div className="container-fluid">
      <div className="row px-0 mx-0">
        <div className="fixed-top col-12 ">
          <NavBar></NavBar>
        </div>

        <div className="col-12">
          <Switch>
            <Route path="/coleccion/:col" component={Coleccion} />
            <Route exact path="/" component={Slider} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>

      <div className="row ">
        <div className="col-12 ">
          <Footer></Footer>
        </div>
      </div>
    </div> */
}

export default App;
