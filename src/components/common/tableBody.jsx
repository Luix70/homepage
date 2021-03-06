import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell(item, campo, lan) {
    if (campo.colSpan === "0") return null;

    if (campo.content)
      return (
        <td key={campo.path} colSpan={campo.colSpan} className="py-0 m-0">
          {campo.content(item)}
        </td>
      );
    //campo.content es una función, y se la llama con el argumento item
    return (
      <td key={campo.path} colSpan={campo.colSpan} className="py-0 m-0">
        {_.get(item, campo.path)}
      </td>
    );
  }
  render() {
    const { listaElementos, listaCampos, campoClave, lan } = this.props;
    //hacemos un doble mapeo para las filas (listaElementos) y las columnas (listaCampos)
    return (
      <tbody>
        {listaElementos.map(item => (
          <tr key={item[campoClave]} className="py-0 m-0">
            {listaCampos.map(campo => this.renderCell(item, campo, lan))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
