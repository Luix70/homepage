import React, { Component } from "react";
import Representante from "./representante";
import Buscador from "./buscador";
class ListaRepresentantes extends Component {
  state = {
    criterio: "",
    enCurso: true,
    facturados: true,
  };

  toggleFacturados = () => {
    const facturados = !this.state.facturados;
    this.setState({ facturados });
  };

  toggleEnCurso = () => {
    const enCurso = !this.state.enCurso;
    this.setState({ enCurso });
  };
  setFilter = async (criterio) => {
    await this.setState({ criterio });
  };

  clearFilter = () => {
    this.setState({
      criterio: "",
      enCurso: true,
      facturados: true,
    });
  };

  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { resultConsulta, lan, usuario } = this.props;
    const { criterio, enCurso, facturados, expandido } = this.state;
    if (!resultConsulta || resultConsulta.representantes.length === 0)
      return null;
    // console.log(
    //   "renderizada lista de representantes " +
    //     (resultConsulta ? resultConsulta.representantes.length : 0)
    //);
    return (
      <React.Fragment>
        <Buscador
          lan={lan}
          onSearch={this.onSearch}
          onExpand={this.onExpand}
          toggleEnCurso={this.toggleEnCurso}
          toggleFacturados={this.toggleFacturados}
          setFilter={this.setFilter}
          clearFilter={this.clearFilter}
          criterio={criterio}
          enCurso={enCurso}
          facturados={facturados}
          expandido={expandido}
          usuario={usuario}
        ></Buscador>

        {resultConsulta === null ? (
          <span>&nbsp;</span>
        ) : (
          resultConsulta.representantes.map((repre) => (
            <Representante
              key={repre.codrep}
              repres={repre}
              onSort={this.handleSortCustomers}
              lan={lan}
              criterio={criterio}
              enCurso={enCurso}
              facturados={facturados}
              usuario={usuario}
            />
          ))
        )}
      </React.Fragment>
    );
  }
}

export default ListaRepresentantes;
