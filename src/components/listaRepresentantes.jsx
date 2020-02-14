import React, { Component } from "react";
import Representante from "./representante";
import Buscador from "./buscador";
class ListaRepresentantes extends Component {
  state = {
    expandido: false,
    criterio: "",
    enCurso: true,
    facturados: true,
    tmpCriterio: ""
  };
  onExpand = () => {
    const exp = !this.state.expandido;
    this.setState({ expandido: exp });
  };

  toggleFacturados = () => {
    const facturados = !this.state.facturados;
    this.setState({ facturados });
  };

  toggleEnCurso = () => {
    const enCurso = !this.state.enCurso;
    this.setState({ enCurso });
  };
  setFilter = async () => {
    const criterio = this.state.tmpCriterio;

    await this.setState({ criterio, expandido: false });
  };

  clearFilter = () => {
    this.setState({
      criterio: "",
      tmpCriterio: "",
      enCurso: true,
      facturados: true,
      expandido: false
    });
  };

  saveCriterio = async event => {
    const valor = event.target.value;

    await this.setState({ tmpCriterio: valor });

    //console.log(this.state.tmpCriterio);
  };

  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { resultConsulta, lan } = this.props;
    const {
      criterio,
      tmpCriterio,
      enCurso,
      facturados,
      expandido
    } = this.state;
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
          saveCriterio={this.saveCriterio}
          criterio={criterio}
          tmpCriterio={tmpCriterio}
          enCurso={enCurso}
          facturados={facturados}
          expandido={expandido}
        ></Buscador>

        {resultConsulta === null ? (
          <span>&nbsp;</span>
        ) : (
          resultConsulta.representantes.map(repre => (
            <Representante
              key={repre.codrep}
              repres={repre}
              onSort={this.handleSortCustomers}
              lan={lan}
              criterio={criterio}
              enCurso={enCurso}
              facturados={facturados}
            />
          ))
        )}
      </React.Fragment>
    );
  }
}

export default ListaRepresentantes;
