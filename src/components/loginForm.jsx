import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import t from "./loginForm.lit.json";
import { toast } from "react-toastify";
class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {}, result: "" };

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
    password: Joi.string().min(8).max(30).required().messages({
      "string.min": t.CC[this.props.lan],
      "string.max": t.CL[this.props.lan],
      "string.empty": t.CR[this.props.lan],
    }),
  };
  schema = Joi.object(this.objSchema);

  doSubmit = async () => {
    //console.log(apiDataEndPoint + "login/authenticate/", this.state.data);
    const { lan } = this.props;

    try {
      const { data: token } = await http.post(
        apiDataEndPoint + "login/authenticate/",
        this.state.data
      );

      if (
        token === "NO_ACTIVADA" ||
        token === "BAD_PASSWORD" ||
        token === "NO_USER"
      ) {
        toast.error(t.TOAST_FAIL[lan]);
        this.setState({ result: token });
      } else {
        //toast.error(t.TOAST_SUCCESS[lan]);
        sessionStorage.removeItem("cachedData");
        sessionStorage.removeItem("apiToken");
        sessionStorage.setItem("apiToken", token);
        this.setState({ result: "" });
        window.location = "/portal";
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
            <h1 className="text-center">{t.TI[lan]}</h1>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>
                {this.renderInput("username", t.US[lan])}
                {this.renderInput("password", t.PA[lan], "password")}
              </div>
              <div className="d-flex justify-content-around align-items-center my-5">
                {this.renderButton(t.TI[lan])}
              </div>

              <div className="row mt-3 d-flex justify-content-around align-items-stretch">
                <div className="col-6">
                  {this.renderLink(t.OC[lan], "/recuperacion")}
                </div>
                <div className="col-6">
                  {this.renderLink(t.SA[lan], "/registro")}
                </div>
              </div>
              <div className="row mt-2 d-flex justify-content-around align-items-stretch text-danger">
                <span className="small p-2">
                  {result === "" ? null : t[result][lan]}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
