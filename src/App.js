import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
import CollectionSlider from "./components/collectionSlider.jsx";
import Coleccion from "./components/coleccion";
import AreaReservada from "./components/areaReservada";
import LoginForm from "./components/loginForm";
import Scans from "./components/scans";
import { getLan, getColecciones } from "./services/datosWeb";
import { WhichBotstrapBreak, randomArray } from "./utils/utilities.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./Custom.css";
import "./AreaCliente.css";
import "./OldWeb.css";

class App extends Component {
  state = {
    lan: "",
    listaColecciones: [],
    windowWidth: 0,
    windowHeight: 0,
    modoEdit: false
  };

  componentDidMount = async () => {
    const jwt = sessionStorage.getItem("apiToken");
    var payload = null;
    try {
      payload = jwt_decode(jwt);
      //console.log(payload);
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
      listaColecciones: randomArray(listaColecciones),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      usuario: payload
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

  handleLogout = () => {
    console.log("handle logout");
    sessionStorage.setItem("apiToken", "");
    this.setState({ usuario: null });
  };

  toggleEdit = () => {
    this.setState({ modoEdit: !this.state.modoEdit });
  };
  render() {
    const {
      lan,
      listaColecciones,
      windowWidth,
      windowHeight,
      usuario,
      modoEdit
    } = this.state;
    //console.log(lan, listaColecciones);
    if (listaColecciones.length === 0 || lan === "") return null;
    return (
      <div className="container-fluid  p-0 m-0 min-vh-100 bg-light ">
        <ToastContainer></ToastContainer>
        <div
          className="row panel w-100 m-0  
         min-vh-100 no-gutters"
        >
          <div className="col-12 fixed-top navegacion m-0">
            <NavBar
              lan={lan}
              handleLanguage={this.handleLanguage}
              windowWidth={this.state.windowWidth}
              windowHeight={this.state.windowHeight}
              BSBreak={WhichBotstrapBreak(windowWidth)}
              usuario={usuario}
              handleLogout={this.handleLogout}
              cols={listaColecciones}
              modoEdit={modoEdit}
              toggleEdit={this.toggleEdit}
            ></NavBar>
          </div>

          <div className="col-12 min-vh-100 m-0 p-0 ">
            <Switch>
              <Route
                path="/coleccion/:col"
                render={props => (
                  <Coleccion
                    lan={lan}
                    usuario={usuario}
                    modoEdit={modoEdit}
                    BSBreak={WhichBotstrapBreak(windowWidth)}
                    {...props}
                  />
                )}
              />
              <Route
                path="/ar"
                render={props => <AreaReservada usuario={usuario} {...props} />}
              />
              <Route path="/login" render={props => <LoginForm {...props} />} />
              <Route
                exact
                path="/"
                render={props => (
                  <CollectionSlider
                    lan={lan}
                    listaColecciones={listaColecciones}
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                    usuario={usuario}
                    modoEdit={modoEdit}
                    {...props}
                  />
                )}
              />
              <Route
                path="/scans/:td/:cd"
                component={Scans}
                modoEdit={modoEdit}
                usuario={usuario}
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
