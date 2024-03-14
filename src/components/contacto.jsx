import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";
import { toast } from "react-toastify";
import t from "./contacto.lit.json";

import Direcciones from "./common/direcciones";
import Mapa from "./common/mapa";

class Contacto extends Form {
  state = {
    data: { email: "", nombre: "", telefono: "", mensaje: "" },
    errors: {},
  };

  objSchema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es", "fr", "uk", "de", "org", "*"] },
      })
      .required()
      .label("e-mail"),
    nombre: Joi.string().min(4).required().label("Nombre"),
    telefono: Joi.number()
      .greater(99999999)
      .less(99999999999)
      .label("Telefono"),
    mensaje: Joi.string().min(1).max(500).required().label("Mensaje"),
  };

  schema = Joi.object(this.objSchema);

  doSubmit = async () => {
    const { lan } = this.props;
    //console.log(config.apiDataEndPoint + "login/authenticate/", this.state.data);
    // console.log(this.state.data);
    try {
      // Para enviarlo Por correo electronico
      //

      // eslint-disable-next-line no-unused-vars
      var dirApp = config.apiDataEndPoint;
      var dirMail = config.apiEndPoint;

      //console.log(dirMail);

      const { data } = await http.post(
        dirMail + "/mail/send/",
        this.state.data
      );

      // Para enviarlo a la aplicacion de indesan
      //
      // const { data } = await http.post(
      //   dirApp + "login/mensaje/",
      //   this.state.data
      // );

      //console.log(data);

      if (data.status === "recibido" || data.status === "success") {
        toast.success(t.SU[lan], {
          position: toast.POSITION.TOP_RIGHT,
        });

        this.setState({
          data: { email: "", nombre: "", telefono: "", mensaje: "" },
        });
      } else {
        toast.error(t.ER[lan], {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(t.ER[lan], {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  render() {
    const { lan } = this.props;
    return (
      <div className="row ">
        <div className="col-12 m-0 p-3">
          <img
            src="/resources/img/fachada.jpg"
            className="img-fluid w-100 h-auto"
            alt="Nuestra empresa"
          />
          <div className="row lead font-italic p-5 text-center d-flex justify-content-center">
            <div className="col-10">{t.BS[lan]}</div>
          </div>
        </div>
        <div className="col-12 col-md-6  p-5  ">
          <div className=" h4 text-justify font-weight-lighter pb-5 text-start d-flex justify-content-center">
            <div className="col-12">
              <h3 className="mt-0">{t.BT[lan]}</h3>
              <hr />
              {t.BIO[lan]}
            </div>
          </div>
          <Direcciones lan={lan}></Direcciones>
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex mt-5 ">
            <div className="row m-0 p-0 w-100 justify-content-around ">
              <div className="col-12 m-0 px-5">
                <h3 className="text-center">{t.ME[lan]}</h3>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("nombre", t.NO[lan])}
                  {this.renderInput("email", t.EM[lan])}
                  {this.renderInput("telefono", t.TE[lan])}
                  {this.renderArea("mensaje", t.DM[lan], "5")}
                  {this.renderButton(t.EN[lan])}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12   m-0 p-0 px-3 mb-3">
          <a
            className="pb-0 ml-2 px-0  btn btn-link"
            href="https://www.google.com/maps/place/Indesan,+S.L./@38.5971805,-1.0955072,17z/data=!4m5!3m4!1s0xd63fcf996d48fdd:0x7bdf775feba5bc57!8m2!3d38.5971805!4d-1.0933185"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.GM[lan]}
          </a>
          <Mapa
            coordenadasCentro={{ lat: "39.5971847", lng: " -1.5" }}
            coordenadasMarker={{ lat: "38.5971847", lng: "-1.0933061" }}
            zoom={7}
          ></Mapa>
        </div>
      </div>
    );
  }
}

export default Contacto;
