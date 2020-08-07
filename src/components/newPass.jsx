import React from "react";
import Joi from "@hapi/joi";
import Form from "./common/form";
import http from "../services/httpService";
import { apiDataEndPoint } from "../config.json";
import t from "./newPass.lit.json";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
class RegisterForm extends Form {
  state = {
    data: { password: "", newPass: "", confirmPass: "" },
    errors: {},
    result: "",
  };

  objSchema = {
    password: Joi.string().min(8).max(30).required().messages({
      "string.min": t.CC[this.props.lan],
      "string.max": t.CL[this.props.lan],
      "string.empty": t.CR[this.props.lan],
    }),
    newPass: Joi.string().min(8).max(30).required().messages({
      "string.min": t.CC[this.props.lan],
      "string.max": t.CL[this.props.lan],
      "string.empty": t.CR[this.props.lan],
    }),
    confirmPass: Joi.any().required().valid(Joi.ref("newPass")).messages({
      //"any.only": t.NM[this.props.lan],
      "any.only": "", // evita que se muestre el cartucho
    }),
  };
  schema = Joi.object(this.objSchema);

  doSubmit = async (e) => {
    //console.log(apiDataEndPoint + "login/register/", this.state.data);

    try {
      var { lan, usuario } = this.props;
      let dataLan = { ...this.state.data };
      dataLan.lan = lan;
      dataLan.username = usuario.Email;
      //console.log(dataLan);
      const { data } = await http.post(
        apiDataEndPoint + "login/changePass/",
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
    const { lan, usuario } = this.props;

    const { passVisible, result } = this.state;

    if (!usuario || !usuario.Email) return <Redirect to="/login"></Redirect>;
    return (
      <div className="d-flex mt-2 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 mt-3 px-2">
            <h4 className="text-center">{t.TI[lan]}</h4>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>
                {this.renderInput(
                  "password",
                  t.OP[lan],
                  "password",
                  passVisible,
                  this.changeVisibility
                )}

                {this.renderInput(
                  "newPass",
                  t.NP[lan],
                  "password",
                  passVisible,
                  this.changeVisibility
                )}

                {this.renderInput("confirmPass", t.RP[lan], "password")}
              </div>
              <div className="d-flex justify-content-around align-items-center my-4">
                {this.renderButton(t.CP[lan])}
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

export default RegisterForm;
