import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Slider from "./components/slider";
import Coleccion from "./components/coleccion";
import "./App.css";

function App() {
  return (
    <div className="container-fluid mx-0 px-0  my-0 py-0">
      <div className="row mx-0 px-0 my-0 py-0 ">
        <div className="fixed-top col col-12 mx-0 px-0 my-0 py-0">
          <NavBar></NavBar>
        </div>

        <div className="col col-12 mx-0 px-0 my-0 py-0">
          <Switch>
            <Route path="/coleccion/:col" component={Coleccion} />
            <Route exact path="/" component={Slider} />
            <Redirect to="/" />
          </Switch>
        </div>
        <div className="col col-12 mx-0 px-0 my-0 py-0">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
