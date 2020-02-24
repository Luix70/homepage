import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import t from "./regForm.lit.json";
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
      .messages({
        "string.min": `"username" mu corto {#limit}`,
        "string.max": `"username" mu largo {#limit}`
      }),
    password_confirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.ref": `contraseñas no coinciden`
      })
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
      <div className="d-flex mt-2 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 px-2">
            <h4 className="text-center">{t.TI[lan]}</h4>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>
                {this.renderInput("username", t.US[lan])}
                {this.renderInput("cif", t.CI[lan])}
                {this.renderInput("password", t.PA[lan], "password")}
                {this.renderInput(
                  "password_confirmation",
                  t.PC[lan],
                  "password"
                )}
              </div>
              <div className="d-flex justify-content-around align-items-center my-2">
                {this.renderButton(t.TI[lan])}
              </div>

              <div className="row mt-2 d-flex justify-content-around align-items-stretch">
                <span className="small p-2">{t.IN[lan]}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
