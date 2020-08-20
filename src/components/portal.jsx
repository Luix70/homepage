/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import t from "./portal.lit.json";

class Portal extends Component {
  state = {};
  render() {
    const { lan, usuario } = this.props;
    return (
      <div className="d-flex mt-5 ">
        {!usuario ? <Redirect to={"/login"}></Redirect> : null}
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 px-2">
            <h1 className="text-center">{t.TI[lan]}</h1>
          </div>
          <div className="row mt-3 mx-4">
            <div className="col-sm-12 col-md-6  col-xl-3 mb-4 ">
              <div className="card p-3 h-100">
                <Link to="/client">
                  <div className="h-100 text-center">
                    <img
                      src="/resources/img/Customer.png"
                      className="card-img-top text-center mb-4"
                      alt=""
                      style={{
                        marginTop: "10%",
                        height: "auto",
                        width: "50%",
                      }}
                    />
                  </div>
                </Link>
                <div className="card-block">
                  <Link to="/client">
                    <h4 className="card-title text-center text-primary">
                      {t.FC[lan]}
                    </h4>
                  </Link>
                  <p className="card-text text-center">{t.FD[lan]}</p>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6  col-xl-3 mb-4 ">
              <div className="card p-3 h-100">
                <Link to="/ar">
                  <div className="h-100 text-center">
                    <img
                      src="/resources/img/Documents.png"
                      className="card-img-top text-center mb-4"
                      alt=""
                      style={{
                        marginTop: "10%",
                        height: "auto",
                        width: "50%",
                      }}
                    />
                  </div>
                </Link>
                <div className="card-block">
                  <Link to="/ar">
                    <h4 className="card-title text-center text-primary">
                      {t.OC[lan]}
                    </h4>
                  </Link>
                  <p className="card-text text-center ">{t.OD[lan]}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6  col-xl-3 mb-4 ">
              <div className="card p-4 h-100">
                <div className="h-100 text-center">
                  <img
                    src="/resources/img/Ventas.png"
                    className="card-img-top text-center mb-4"
                    alt=""
                    style={{
                      marginTop: "10%",
                      height: "auto",
                      width: "50%",
                      opacity: "0.2",
                    }}
                  />
                </div>

                <div className="card-block ">
                  <h4 className="card-title text-center text-muted">
                    {t.OF[lan]}
                  </h4>

                  <p className="card-text text-center">{t.VD[lan]}</p>
                  <h4 className="card-title text-center text-danger bg-warning p-3">
                    {t.PR[lan]}
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6  col-xl-3 mb-4 ">
              <div className="card p-4 h-100">
                <div className="h-100 text-center">
                  <img
                    src="/resources/img/catalog.png"
                    className="card-img-top text-center mb-4"
                    alt=""
                    style={{
                      marginTop: "10%",
                      height: "auto",
                      width: "50%",
                      opacity: "0.2",
                    }}
                  />
                </div>
                <div className="card-block">
                  <h4 className="card-title text-center text-muted">
                    {t.DC[lan]}
                  </h4>
                  <p className="card-text text-center ">{t.DD[lan]}</p>
                  <h4 className="card-title text-center text-danger bg-warning p-3">
                    {t.PR[lan]}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Portal;
