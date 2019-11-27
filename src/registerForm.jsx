import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "", mail: "" },
    errors: {}
  };

  objSchema = {
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(15)
      .required()
      .label("Usuario"),
    password: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required()
      .label("Contraseña"),
    mail: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es", "fr", "uk", "de", "org", "*"] }
      })
      .required()
      .label("e-mail"),
    name: Joi.string()

      .min(8)
      .max(50)
      .required()
      .label("Nombre")
  };
  schema = Joi.object(this.objSchema);

  doSubmit = () => {
    this.props.history.replace("/ar");
  };

  render() {
    return (
      <div className="formContainer">
        <h1>Registro de usuarios</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Usuario")}
          {this.renderInput("name", "Nombre")}
          {this.renderInput("mail", "Direccion e-mail")}
          {this.renderInput("password", "Contraseña", "password")}
          {this.renderButton("Registro")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
