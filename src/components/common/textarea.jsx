import React from "react";
const TextArea = props => {
  const { name, label, error, lines, ...rest } = props;
  //console.log(rest);
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        id={name}
        className="form-control"
        rows={lines}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
