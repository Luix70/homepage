import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
import Slider from "./components/slider.jsx";
import Coleccion from "./components/coleccion";
import { getLan, getColecciones } from "./services/datosWeb";
import "./App.css";

class App extends Component {
  state = { lan: "", listaColecciones: [] };
  componentDidMount = async () => {
    const listaColecciones = await getColecciones();
    this.setState({ lan: getLan(), listaColecciones });
  };

  handleLanguage = lan => {
    sessionStorage.setItem("lan", lan);
    this.setState({ lan });
  };

  render() {
    const { lan, listaColecciones } = this.state;
    //console.log(lan, listaColecciones);
    if (listaColecciones.length === 0 || lan === "") return null;
    return (
      <div className="container-fluid  px-0 mx-0 min-vh-100 ">
        <div className="row panel w-100 mx-0 px-0  min-vh-100 no-gutters">
          <div className="col-12 fixed-top">
            <NavBar lan={lan} handleLanguage={this.handleLanguage}></NavBar>
          </div>

          <div className="col-12  min-vh-100 mx-0 px-0 ">
            <Switch>
              <Route
                path="/coleccion/:col"
                render={props => <Coleccion lan={lan} {...props} />}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <Slider
                    lan={lan}
                    listaColecciones={listaColecciones}
                    {...props}
                  />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
        <div className="row  w-100 mx-0">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
