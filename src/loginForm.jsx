import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import { apiEndPoint3 } from "../config.json";

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
    //console.log(apiEndPoint3 + "login/authenticate/", this.state.data);
    const { data: token } = await http.post(
      apiEndPoint3 + "login/authenticate/",
      this.state.data
    );
    //console.log(token);
    sessionStorage.removeItem("cachedData");
    sessionStorage.removeItem("apiToken");
    sessionStorage.setItem("apiToken", token);

    window.location = "/";
  };

  render() {
    return (
      <div className="formContainer">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Usuario")}
          {this.renderInput("password", "Contraseña", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
