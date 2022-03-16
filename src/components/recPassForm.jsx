import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";
import t from "./recPassForm.lit.json";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class RecPassForm extends Form {
  state = { data: { username: "" }, errors: {}, result: "" };

  objSchema = {
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es", "fr", "uk", "de", "org", "*"] },
      })
      .required()
      .messages({
        "string.email": t.VE[this.props.lan],
        "string.empty": t.CR[this.props.lan],
      }),
  };
  schema = Joi.object(this.objSchema);

  doSubmit = async () => {
    //console.log(config.apiDataEndPoint + "login/authenticate/", this.state.data);
    const { lan } = this.props;
    const dataLan = { ...this.state.data };
    dataLan.lan = lan;
    try {
      const { data: token } = await http.post(
        config.apiDataEndPoint + "login/passwordRecovery/",
        dataLan
      );
      console.log(token);
      if (
        token === "CREDENTIAL_NOT_ACTIVATED" ||
        token === "CREDENTIAL_NOT_EXISTS" ||
        token === "CREDENTIAL_FAILED" ||
        token === "EMAIL_FAILED"
      ) {
        toast.error(t.TOAST_FAIL[lan]);
        this.setState({ result: token });
      } else {
        toast.success(t.TOAST_SUCCESS[lan]);
        sessionStorage.removeItem("cachedData");
        sessionStorage.removeItem("apiToken");
        sessionStorage.setItem("apiToken", token);
        this.setState({ result: "OK" });
        //window.location = "/ar";
      }
    } catch (error) {
      toast.error(t.TOAST_FAIL[lan]);
      this.setState({ result: "NO_CONNECTION" });
    }
  };

  render() {
    const { lan } = this.props;
    const { result } = this.state;
    return (
      <div className="d-flex mt-5 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 px-2">
            <h1 className="text-center">{t.SC[lan]}</h1>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>{this.renderInput("username", t.US[lan])}</div>
              <div className="d-flex justify-content-around align-items-center my-5">
                {this.renderButton(t.SC[lan])}
              </div>
              <div
                className={
                  "row mt-2 d-flex justify-content-around align-items-stretch " +
                  (result === "OK" ? "text-success" : "text-danger")
                }
              >
                <span className="small p-2">
                  {result === "" ? null : t[result][lan]}
                </span>
              </div>
              <div className="d-flex justify-content-center mt-5 mx-5 ">
                {result === "OK" ? (
                  <Link
                    to="/ar"
                    className="btn btn-outline-secondary  d-flex align-items-center justify-content-center"
                  >
                    {t.AU[lan]}
                  </Link>
                ) : null}
                {result === "CREDENTIAL_NOT_EXISTS" ? (
                  <Link
                    to="/registro"
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  >
                    {t.SA[lan]}
                  </Link>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RecPassForm;
