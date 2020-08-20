import React from "react";
import MaterialIcon from "react-google-material-icons";
const Input = props => {
  const {
    type,
    name,
    label,
    error,
    passVisible,
    changeVisibility,
    ...rest
  } = props;
  //console.log(rest);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          {...rest}
          name={name}
          id={name}
          type={type === "password" && !passVisible ? "password" : "text"}
          className="form-control "
        />
        {type === "password" ? (
          <div className="input-group-append">
            <button
              onClick={changeVisibility}
              className="btn btn-outline-secondary p-0 px-2 pt-1"
              type="button"
            >
              {passVisible ? (
                <MaterialIcon icon="visibility_off" size={24} />
              ) : (
                <MaterialIcon icon="visibility" size={24} />
              )}
            </button>
          </div>
        ) : null}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
