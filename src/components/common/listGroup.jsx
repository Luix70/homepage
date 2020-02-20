import React, { Component } from "react";
import paginate from "../../utils/paginate";
import _ from "lodash";
import Pagination from "./pagination";
import t from "./listGroup.lit.json";
class ListGroup extends Component {
  state = {
    itemList: [],
    onItemSelect: {},
    defaultItemClass:
      "list-group-item d-flex justify-content-between align-items-center menu-lateral small",
    paginaActual: 1,
    itemsPerPage: 9,
    desplegado: true,
    search: ""
  };

  handlePageClicked = page => {
    this.setState({ paginaActual: page });
  };

  toggleDesplegado = () => {
    this.setState({ desplegado: !this.state.desplegado });
  };

  handleSearch = crit => {
    const search = crit.target.value;
    this.setState({ search, paginaActual: 1 });
  };

  clearSearch = () => {
    this.setState({ search: "", paginaActual: 1 });
  };

  render() {
    const {
      itemList,
      onItemSelect,
      itemId,
      itemValue,
      selectedItem,
      lan
    } = this.props;

    const { search } = this.state;
    const itemsFiltrados = itemList.filter(item =>
      item.nombre.toUpperCase().includes(search.toUpperCase())
    );
    //console.log(itemsFiltrados);
    const itemsOrdenados = _.orderBy(itemsFiltrados, ["nombre"], ["asc"]);
    const itemsToShow = [
      { codrep: 0, nombre: t.TO[lan] },
      ...paginate(
        itemsOrdenados,
        this.state.paginaActual,
        this.state.itemsPerPage
      ),
      { codrep: -1, nombre: t.NI[lan] }
    ];

    return (
      <div className="row m-0 p-0 w-100">
        <div className="d-flex w-100 justify-content-center align-items-center m-0 p-1  ">
          {this.state.desplegado ? (
            <div className="d-flex w-100 justify-content-between align-items-center m-0 p-1 ">
              <div>
                <Pagination
                  itemCount={itemsFiltrados.length}
                  currentPage={this.state.paginaActual}
                  itemsPerPage={this.state.itemsPerPage}
                  pageClicked={this.handlePageClicked}
                />
                <div className="d-inline">
                  <form action="" className="form-inline">
                    <div className="d-flex justify-content-start">
                      <input
                        type="text"
                        className="form-control pr-0 mr-0"
                        id="searchString"
                        aria-describedby="Buscar Repres"
                        placeholder={t.BR[lan]}
                        onChange={this.handleSearch}
                        value={search}
                      />
                      <button
                        className="x-small btn btn-primary ml-2 px-3 py-0 "
                        onClick={this.clearSearch}
                      >
                        X
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex w-100 justify-content-between align-items-center m-0 p-1 ">
              <span className="p-2">
                {t.RE[lan] +
                  ": " +
                  (selectedItem === -1
                    ? t.NI[lan]
                    : selectedItem === 0
                    ? t.TO[lan]
                    : itemList.find(item => {
                        return item.codrep === selectedItem;
                      }).nombre)}
              </span>
              <button
                className="btn btn-primary m-0 p-2"
                onClick={this.toggleDesplegado}
              >
                {t.SR[lan]}
              </button>
            </div>
          )}
        </div>
        <div
          className={this.state.desplegado ? "w-100 d-block" : "w-100 d-none"}
        >
          <ul
            className="list-group list-group-flush w-100   "
            style={{ cursor: "pointer" }}
          >
            {itemsToShow.map(item => {
              // determinamos qué clase aplicar al item
              const claseItem =
                item[itemId] === 0 // es el item 0 (encabezado) ?
                  ? selectedItem === 0 // es el seleccionado ?
                    ? this.state.defaultItemClass + " listGroupHeader active " // le aplicamos el estilo correspondiente
                    : this.state.defaultItemClass + " listGroupHeader"
                  : item[itemId] === -1 // es el ítem -1 (pie)
                  ? selectedItem === -1 // es el seleccionado ?
                    ? this.state.defaultItemClass + " listGroupFooter active" // le aplicamos el estilo correspondiente
                    : this.state.defaultItemClass + " listGroupFooter"
                  : selectedItem === item[itemId] // // es el seleccionado y no es ni encabezado ni pie?
                  ? this.state.defaultItemClass + " active" // le aplicamos el estilo correspondiente
                  : this.state.defaultItemClass;

              return (
                <li
                  onClick={() => {
                    onItemSelect(item);
                    this.setState({ desplegado: false });
                  }}
                  key={item[itemId]}
                  className={claseItem}
                >
                  {item[itemValue]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  itemId: "_id",
  itemValue: "name"
};

export default ListGroup;
