import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
import HeroSection from "./components/heroSection.jsx";
import CollectionSlider from "./components/collectionSlider.jsx";
import MaterialsSection from "./components/materialsSection.jsx";
import QualitySection from "./components/qualitySection.jsx";
import Contacto from "./components/contacto.jsx";
import Coleccion from "./components/coleccion";
import AreaReservada from "./components/areaReservada";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import RecPassForm from "./components/recPassForm";
import DashCliente from "./components/dashCliente";
import Portal from "./components/portal";
import LanRedirect from "./components/lanRedirect";
import NewPass from "./components/newPass";
import Ofertas from "./components/ofertas";
import Carrito from "./components/carrito";
import Activate from "./components/activate";
import { getLan, getColecciones } from "./services/datosWeb";
import { WhichBotstrapBreak, randomArray } from "./utils/utilities.js";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
import t from "./App.lit.json";
import {
  MobileView,
  BrowserView
} from "react-device-detect";


// Estilos

import "react-toastify/dist/ReactToastify.css";
import "./Custom.css";



class App extends Component {
  state = {
    lan: "es",
    listaColecciones: [],
    windowWidth: 0,
    windowHeight: 0,
    modoEdit: false,
  };

  componentDidMount = async () => {
    const jwt = sessionStorage.getItem("apiToken");
    var payload = null;
    //primero comprobamos la cookie
    var co = Cookies.get("CookieConsent");

    if (co === "false") {
      Cookies.remove("CookieConsent");
      window.location.reload(false);
    }

    try {
      payload = jwt_decode(jwt);
      //console.log(payload);
      sessionStorage.setItem("lan", payload.Idioma.toLowerCase());
      sessionStorage.setItem("nombreUsuario", payload.NombreUsuario);
    } catch {
      //sessionStorage.setItem("lan", "");
      sessionStorage.setItem("nombreUsuario", "");
    }

    const listaColecciones = await getColecciones();

    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.setState({
      lan: getLan(),
      listaColecciones: randomArray(listaColecciones),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      usuario: payload,
    });
  };

  updateDimensions = () => {
    let update_width = window.innerWidth;
    let update_height = window.innerHeight;
    this.setState({ windowWidth: update_width, windowHeight: update_height });
  };

  handleLanguage = (lan) => {
    sessionStorage.setItem("lan", lan);
    this.setState({ lan });
  };

  handleLogout = () => {
    console.log("handle logout");
    sessionStorage.removeItem("cachedData");
    sessionStorage.removeItem("apiToken");
    sessionStorage.removeItem("nombreUsuario");
    this.setState({ usuario: null });
  };

  handleCurrency = (currency) => {
    const nUsuario = { ...this.state.usuario };
    nUsuario.Moneda = currency;
    this.setState({ usuario: nUsuario });
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
      modoEdit,
    } = this.state;
    //console.log(lan, listaColecciones);
    if (listaColecciones.length === 0 || lan === "") return null;
    return (
      <div className="p-0 m-0 bg-white">


        
        <div className="row m-0 p-0 no-gutters">
          
            <BrowserView className="w-100">
            
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
                position = "top"
              ></NavBar>
            
            </BrowserView>
            
          

          <div className="col-12 flex-columnm-0 p-0  ">
        
            <Switch>
              <Route
                path="/coleccion/:col"
                render={(props) => (
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
                render={(props) => (
                  <AreaReservada usuario={usuario} lan={lan} {...props} />
                )}
              />
              <Route
                path="/client"
                render={(props) => (
                  <DashCliente
                    usuario={usuario}
                    lan={lan}
                    AppLanguage={this.handleLanguage}
                    {...props}
                  />
                )}
              />
              <Route
                path="/portal"
                render={(props) => (
                  <Portal usuario={usuario} lan={lan} {...props} />
                )}
              />
              <Route
                path="/registro"
                render={(props) => (
                  <RegisterForm usuario={usuario} lan={lan} {...props} />
                )}
              />
              <Route
                path="/recuperacion"
                render={(props) => (
                  <RecPassForm usuario={usuario} lan={lan} {...props} />
                )}
              />
              <Route
                path="/contact"
                render={(props) => (
                  <Contacto usuario={usuario} lan={lan} {...props} />
                )}
              />
              <Route
                path="/login"
                render={(props) => <LoginForm lan={lan} {...props} />}
              />
              <Route
                path="/ofertas"
                render={(props) => (
                  <Ofertas
                    lan={lan}
                    usuario={usuario}
                    handleCurrency={this.handleCurrency}
                    {...props}
                  />
                )}
              />
              <Route
                path="/carrito"
                render={(props) => (
                  <Carrito
                    lan={lan}
                    usuario={usuario}
                    handleCurrency={this.handleCurrency}
                    {...props}
                  />
                )}
              />
              <Route
                path="/newPass"
                render={(props) => (
                  <NewPass lan={lan} usuario={usuario} {...props} />
                )}
              />
              <Route path="/en">
                <LanRedirect lan="en" handleLanguage={this.handleLanguage} />
              </Route>
              <Route path="/es">
                <LanRedirect lan="es" handleLanguage={this.handleLanguage} />
              </Route>
              <Route path="/fr">
                <LanRedirect lan="fr" handleLanguage={this.handleLanguage} />
              </Route>

              <Route
                path="/activate"
                render={(props) => (
                  <Activate
                    lan={lan}
                    handleLanguage={this.handleLanguage}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <React.Fragment>
                      <HeroSection
                        lan={lan}
                        windowWidth={windowWidth}
                        windowHeight={windowHeight}
                      />
                      <MaterialsSection
                        lan={lan}
                        windowWidth={windowWidth}
                        windowHeight={windowHeight}
                       />


                       
                      <CollectionSlider
                        lan={lan}
                        listaColecciones={listaColecciones}
                        windowWidth={windowWidth}
                        windowHeight={windowHeight}
                        usuario={usuario}
                        modoEdit={modoEdit}
                        {...props}
                      />

                      <QualitySection
                        lan={lan}
                        windowWidth={windowWidth}
                        windowHeight={windowHeight}
                       /> 
                      
                  </React.Fragment>
                 
                )}
              />
              <Redirect to="/" />
            </Switch>
          </div>
          <BrowserView className=" w-100">
            <div className="row m-0 ">
             <Footer lan={lan}></Footer>
            </div>
          </BrowserView>

          <MobileView className="pb-5 w-100">
           <div className="row w-100 m-0 pb-3 ">
             <Footer lan={lan}></Footer>
            </div>
          </MobileView>

          <MobileView className="stickToBottom w-100">
            
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
              position="bottom"
            ></NavBar>
          
          </MobileView>


        </div>

        <ToastContainer></ToastContainer>
        <CookieConsent
          buttonText={t.AC[lan]}
          style={{ background: "#2B2B2B" }}
          buttonStyle={{
            backgroundColor: "#0275d8",
            color: "#fff",
            fontSize: "1em",
          }}
          enableDeclineButton
          onDecline={() => {
            window.location = "https://google.com";
          }}
          declineButtonText={t.CA[lan]}
          declineButtonStyle={{
            backgroundColor: "#d9534f",
            color: "#fff",
            fontSize: "1em",
          }}
          flipButtons
        >
          {t.ME[lan]}
        </CookieConsent>

      </div>
    );
  }
}

export default App;
