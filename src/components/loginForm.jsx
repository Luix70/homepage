import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import t from "./loginForm.lit.json";
class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  objSchema = {
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es", "fr", "uk", "de", "org", "*"] }
      })
      .required()
      .label("e-mail"),
    password: Joi.string()

      .min(8)
      .max(30)
      .required()
      .label("Contraseña")
  };
  schema = Joi.object(this.objSchema);

  doSubmit = async () => {
    //console.log(apiDataEndPoint + "login/authenticate/", this.state.data);
    const { data: token } = await http.post(
      apiDataEndPoint + "login/authenticate/",
      this.state.data
    );
    //console.log(token);
    sessionStorage.removeItem("cachedData");
    sessionStorage.removeItem("apiToken");
    sessionStorage.setItem("apiToken", token);

    window.location = "/ar";
  };

  render() {
    const { lan } = this.props;
    return (
      <div className="d-flex mt-5 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 px-2">
            <h1 className="text-center">{t.TI[lan]}</h1>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>
                {this.renderInput("username", t.US[lan])}
                {this.renderInput("password", t.PA[lan], "password")}
              </div>
              <div className="d-flex justify-content-around align-items-center">
                {this.renderButton(t.TI[lan])}
              </div>

              <div className="row mt-3 d-flex justify-content-around align-items-center">
                <div className="col-6">{this.renderLink(t.OC[lan])}</div>
                <div className="col-6">{this.renderLink(t.SA[lan])}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
