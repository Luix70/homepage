import React, { Component } from "react";
import queryString from "query-string";
import t from "./activate.lit.json";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import { toast } from "react-toastify";

class Activate extends Component {
  state = { result: "" };

  componentWillMount = async () => {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    let ncod = params.cod.replace(/ /g, "+");
    params.cod = ncod;

    try {
      var { lan } = this.props;

      //console.log(dataLan);
      const { data } = await http.post(
        apiDataEndPoint + "login/activate/",
        params
      );

      this.setState({ result: data });

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
    const { lan } = this.props;
    const { result } = this.state;

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
      </div>
    );
  }
}

export default Activate;
