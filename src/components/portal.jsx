import React, { Component } from "react";
import t from "./portal.lit.json";
class Portal extends Component {
  state = {};
  render() {
    const { lan } = this.props;
    return (
      <div className="d-flex mt-5 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 px-2">
            <h1 className="text-center">{t.TI[lan]}</h1>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default Portal;
