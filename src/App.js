import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer.jsx";
import CollectionSlider from "./components/collectionSlider.jsx";
import Coleccion from "./components/coleccion";
import { getLan, getColecciones } from "./services/datosWeb";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = { lan: "", listaColecciones: [] };
  componentDidMount = async () => {
    const listaColecciones = await getColecciones();
    this.setState({
      lan: getLan(),
      listaColecciones: this.randomCols(listaColecciones)
    });
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
    const { lan, listaColecciones } = this.state;
    //console.log(lan, listaColecciones);
    if (listaColecciones.length === 0 || lan === "") return null;
    return (
      <div className="container-fluid  p-0 m-0 min-vh-100 ">
        <ToastContainer></ToastContainer>
        <div className="row panel w-100 m-0 p-0  min-vh-100 no-gutters">
          <div className="col-12 fixed-top">
            <NavBar lan={lan} handleLanguage={this.handleLanguage}></NavBar>
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
                    {...props}
                  />
                )}
              />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
        <div className="row  w-100 m-0">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
