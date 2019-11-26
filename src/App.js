import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
import CollectionSlider from "./components/collectionSlider.jsx";
import Coleccion from "./components/coleccion";
import { getLan, getColecciones } from "./services/datosWeb";
import { WhichBotstrapBreak } from "./utilities/utilities.js";
import jwt_decode from "jwt-decode";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = { lan: "", listaColecciones: [], windowWidth: 0, windowHeight: 0 };

  componentDidMount = async () => {
    const jwt = sessionStorage.getItem("apiToken");
    try {
      const payload = jwt_decode(jwt);
      console.log(payload);
      sessionStorage.setItem("lan", payload.Idioma.toLowerCase());
      sessionStorage.setItem("nombreUsuario", payload.NombreUsuario);
    } catch {
      sessionStorage.setItem("lan", "");
      sessionStorage.setItem("nombreUsuario", "");
    }

    const listaColecciones = await getColecciones();

    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.setState({
      lan: getLan(),
      listaColecciones: this.randomCols(listaColecciones),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  updateDimensions = () => {
    let update_width = window.innerWidth;
    let update_height = window.innerHeight;
    this.setState({ windowWidth: update_width, windowHeight: update_height });
  };

  handleLanguage = lan => {
    sessionStorage.setItem("lan", lan);
    this.setState({ lan });
  };

  randomCols = cols => {
    const array = [...cols];

    for (let i = array.length - 1; i > -1; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    //console.log(cols, array);
    return array;
  };

  render() {
    const { lan, listaColecciones, windowWidth, windowHeight } = this.state;
    //console.log(lan, listaColecciones);
    if (listaColecciones.length === 0 || lan === "") return null;
    return (
      <div className="container-fluid  p-0 m-0 min-vh-100 ">
        <ToastContainer></ToastContainer>
        <div className="row panel w-100 m-0 p-0  min-vh-100 no-gutters">
          <div className="col-12 fixed-top">
            <NavBar
              lan={lan}
              handleLanguage={this.handleLanguage}
              windowWidth={this.state.windowWidth}
              windowHeight={this.state.windowHeight}
              BSBreak={WhichBotstrapBreak(windowWidth, windowHeight)}
            ></NavBar>
          </div>

          <div className="col-12  min-vh-100 m-0 p-0 ">
            <Switch>
              <Route
                path="/coleccion/:col"
                render={props => <Coleccion lan={lan} {...props} />}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <CollectionSlider
                    lan={lan}
                    listaColecciones={listaColecciones}
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                    {...props}
                  />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
        <div className="row w-100 m-0">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
