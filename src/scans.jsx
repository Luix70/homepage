import React, { Component } from "react";
import getScans from "../services/archivos";
import PDFViewer from "pdf-viewer-reactjs";
import DocView from "./common/docView";
import { toast } from "react-toastify";
import config from "../config.json";
class Scans extends Component {
  componentDidMount = async () => {
    const { cd, td } = this.props.match.params;

    const scans = await getScans(td, cd, 3);

    this.setState({ scans: scans, cd: cd, td: td });
  };

  handleClick = (ruta, tipo) => {
    const { cd, td } = this.state;
    window.location.href =
      config.apiEndPoint +
      "/JTransferScan?ruta=" +
      ruta +
      "&cd=" +
      cd +
      "&td=" +
      td +
      "&tipoArchivo=" +
      tipo;

    this.setState({
      rutaPDF:
        config.apiEndPoint +
        "/JTransferScan?ruta=" +
        ruta +
        "&cd=" +
        cd +
        "&td=" +
        td +
        "&tipoArchivo=" +
        tipo
    });

    toast.success("Archivo descargado. Revisa las descargas de tu navegador");
  };

  state = { scans: [], cd: "", td: "", ta: "", rutaPDF: "" };

  render() {
    try {
      return (
        <div className="d-flex">
          <div className="cardContainer  col-2">
            {this.state.scans.map(scan => (
              <DocView
                key={scan.numerador}
                tipo={scan.TipoImagen}
                ruta={scan.ruta + "\\" + scan.documento}
                onClick={this.handleClick}
              ></DocView>
            ))}
          </div>
          <div className="cardContainer col-10">
            {this.state.rutaPDF === "" ? null : (
              <PDFViewer
                document={{
                  url: this.state.rutaPDF
                }}
              />
            )}
          </div>
        </div>
      );
    } catch (error) {
      toast.error("No se han podido recuperar imagenes");
      return <div></div>;
    }
  }
}

export default Scans;
