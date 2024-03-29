import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import config from "../config.json";
import t from "./registerForm.lit.json";
import { toast } from "react-toastify";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", cif: "" },
    errors: {},
    result: "",
  };

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
    cif: Joi.string().min(8).max(15).required().messages({
      "string.min": t.NC[this.props.lan],
      "string.max": t.NL[this.props.lan],
      "string.empty": t.CR[this.props.lan],
    }),

    //   ,
    // password_confirmation: Joi.string()
    //   .valid(Joi.ref("password"))
    //   .required()
    //   .messages({
    //     "string.only": ``,
    //     "string.empty": t.CR[this.props.lan]
    //   })
  };
  schema = Joi.object(this.objSchema);

  doSubmit = async (e) => {
    //console.log(config.apiDataEndPoint + "login/register/", this.state.data);

    try {
      var { lan } = this.props;
      let dataLan = { ...this.state.data };
      dataLan.lan = lan;
      //console.log(dataLan);
      const { data } = await http.post(
        config.apiDataEndPoint + "login/register/",
        dataLan
      );
      this.setState({ result: data });

      data === "OK"
        ? toast.success(t["TOAST_SUCCESS"][lan])
        : toast.error(t["TOAST_FAIL"][lan]);
      //console.log(data);
    } catch (error) {
      toast.error(t["TOAST_FAIL"][lan]);
      this.setState({ result: "CREDENTIAL_FAILED" });
      //console.log(error);
    }

    //window.location = "/";
  };

  render() {
    const { lan } = this.props;
    const { passVisible, result } = this.state;
    return (
      <div className="d-flex mt-2 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 mt-3 px-2">
            <h4 className="text-center">{t.TI[lan]}</h4>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>
                {this.renderInput("username", t.US[lan])}
                {this.renderInput("cif", t.CI[lan])}
                {this.renderInput(
                  "password",
                  t.PA[lan],
                  "password",
                  passVisible,
                  this.changeVisibility
                )}
              </div>
              <div className="d-flex justify-content-around align-items-center my-4">
                {this.renderButton(t.SA[lan])}
              </div>

              <div
                className={
                  "row mt-2 d-flex justify-content-around align-items-stretch " +
                  (result === ""
                    ? "text-primary"
                    : result === "OK"
                    ? "text-success"
                    : "text-danger")
                }
              >
                <span className="small p-2">
                  {result === "" ? t.IN[lan] : t[result][lan]}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
