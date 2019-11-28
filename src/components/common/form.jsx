import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./input";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = this.schema.validate(this.state.data, {
      abortEarly: false
    });

    if (!result.error) return null;

    //el objeto error contiene un array details que vamos a mapear
    const errors = {}; //en principio, es un objeto vacio

    for (let item of result.error.details) errors[item.path[0]] = item.message;
    //item.path es un array con un solo elemento, por eso obtenemos su valos así
    return errors;
  };

  validateProperty = input => {
    const { name, value } = input;
    //debemos devolver un mensaje de error si input.value no cumple con los requisitos
    //para ello debemos definir un subobjeto solo con esa propiedad y un subEsquema solo para esa propiedad
    const obj = { [name]: value }; //[name] es una funcionalidad de ES6 para construri objetos: Computed Property name syntax
    //es equivalente a const obj = {} ; obj[name]= value;

    const objSubSchema = { [name]: this.objSchema[name] };
    const subSchema = Joi.object(objSubSchema);

    const result = subSchema.validate(obj);

    return result.error ? result.error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log("No enviado");
    //procedimiento as seguir si no hay errores. p.ej: reenvio al área reservada

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //recuperamos el valor de la cuenta del estado
    const data = { ...this.state.data };
    //cambiamos el valor que proceda
    data[input.name] = input.value;

    //ahora comprobamos si con los nuevos valores se ha producido algun error
    //en primer lugar clonamos el estado actual de errors
    const errors = { ...this.state.errors };
    //implementamos un nuevo método en el que evaluamos
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // y actualizamos de nuev el estado
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        error={errors[name]}
      />
    );
  }

  //no necesitamos un método render, ya que de eso se encargará la instancia
  // render() {
  //     return (  );
  // }
}

export default Form;
