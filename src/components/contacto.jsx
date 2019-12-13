import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import { toast } from "react-toastify";
import t from "./contacto.lit.json";
import Direcciones from "./common/direcciones";

class Contacto extends Form {
  state = {
    data: { email: "", nombre: "", telefono: "", mensaje: "" },
    errors: {}
  };

  objSchema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es", "fr", "uk", "de", "org", "*"] }
      })
      .required()
      .label("e-mail"),
    nombre: Joi.string()
      .min(4)
      .required()
      .label("Nombre"),
    telefono: Joi.number()
      .greater(99999999)
      .less(99999999999)
      .label("Telefono"),
    mensaje: Joi.string()
      .min(1)
      .max(500)
      .required()
      .label("Mensaje")
  };

  schema = Joi.object(this.objSchema);

  doSubmit = async () => {
    //console.log(apiDataEndPoint + "login/authenticate/", this.state.data);
    console.log(this.state.data);
    try {
      const { data } = await http.post(
        apiDataEndPoint + "login/mensaje/",
        this.state.data
      );

      console.log(data);

      if (data.status === "recibido") {
        toast.success("Mensaje Enviado con éxito", {
          position: toast.POSITION.TOP_RIGHT
        });

        this.setState({
          data: { email: "", nombre: "", telefono: "", mensaje: "" }
        });
      }
    } catch (error) {
      toast.error("Se ha producido un error al enviar el mensaje", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  render() {
    const { lan } = this.props;
    return (
      <div className="row">
        <div className="col-12 col-md-6  p-5 bg-dark text-light ">
          <Direcciones lan={lan}></Direcciones>
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex mt-5 ">
            <div className="row m-0 p-0 w-100 justify-content-around ">
              <div className="col-12 m-0 px-5">
                <h3 className="text-center">{t.ME[lan]}</h3>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("nombre", "Nombre")}
                  {this.renderInput("email", "Email")}
                  {this.renderInput("telefono", "Telefono")}
                  {this.renderArea(
                    "mensaje",
                    "Mensaje (máximo 500 caracteres)",
                    "5"
                  )}
                  {this.renderButton("Enviar")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contacto;
