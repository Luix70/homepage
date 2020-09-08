import React, { Component } from "react";
import queryString from "query-string";
import t from "./activate.lit.json";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import { toast } from "react-toastify";

class Activate extends Component {
  state = { result: "" };

  componentWillMount = async () => {
    let url = this.props.location.search;
    const { handleLanguage } = this.props;
    let params = queryString.parse(url);
    let ncod = params.cod.replace(/ /g, "+");
    params.cod = ncod;
    if (params.lan === "") {
      params.lan = "es";
    }

    var { lan } = params;
    handleLanguage(lan);

    try {
      //console.log(dataLan);
      const { data } = await http.post(
        apiDataEndPoint + "login/activate/",
        params
      );

      this.setState({ result: data, lan });

      data === "OK"
        ? toast.success(t["TOAST_SUCCESS"][lan])
        : toast.error(t["TOAST_FAIL"][lan]);
      console.log(data);
    } catch (error) {
      toast.error(t["TOAST_FAIL"][lan]);
      this.setState({ result: "ACTIVATION_ERROR" });
      //console.log(error);
    }
  };

  render() {
    const { lan, result } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-center mt-5 mx-5 ">
          {result === "" ? (
            <span className="lead mt-5 ">{t.TRYING[lan]}</span>
          ) : (
            <span
              className={
                "lead mt-5 " +
                (result === "OK" ? "text-success" : "text-danger")
              }
            >
              {t[result][lan]}
            </span>
          )}
        </div>
        <div className="d-flex justify-content-center mt-5 mx-5 ">
          {result === "OK" || result === "ALREADY_ACTIVATED" ? (
            <Link
              to="/ar"
              className="btn btn-outline-secondary  d-flex align-items-center justify-content-center"
            >
              {t.AU[lan]}
            </Link>
          ) : null}
          {result === "CODE_MISMATCH" ||
          result === "ACTIVATION_CODE_NOT_FOUND" ? (
            <Link
              to="/registro"
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            >
              {t.SA[lan]}
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Activate;
