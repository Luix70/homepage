import React, { Component } from "react";

class DocView extends Component {
  state = {};
  render() {
    const { tipo, ruta, onClick } = this.props;
    return (
      <div className="card docThumbnail p-0 m-2 ">
        <div>
          <img src={"/docindesan_min.jpg"} className="card-img-top" alt="" />
          <div className="bg-secondary m-0 p-0 pb-2 card-body text-white row">
            <div className="col-12 text-center">
              <h5 className="lead ">{tipo}</h5>
            </div>

            <div className="col-12 text-center">
              <button
                onClick={() => onClick(ruta, tipo)}
                className="btn btn-primary "
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DocView;
