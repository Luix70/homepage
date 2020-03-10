import React from "react";

import { Redirect } from "react-router-dom";
const LanRedirect = props => {
  const { handleLanguage, lan } = props;
  console.log(handleLanguage, lan);
  handleLanguage(lan);
  return <Redirect to="/"></Redirect>;
};

export default LanRedirect;
