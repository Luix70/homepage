import React from "react";

const Highlight = (texto, subcadena) => {
  console.log(texto.toString(), subcadena);
  if (texto === "") return null;
  if (subcadena === "") {
    return <span>{texto}</span>;
  }
  var fragmentos = texto.toString().split(subcadena);

  console.log(fragmentos, fragmentos.length);
  if (fragmentos.length === 1) {
    return <span>{texto}</span>;
  }

  fragmentos.map(fr => {
    return (
      <React.Fragment>
        <span>{fr}</span>{" "}
        <span className="bg-danger text-light">{subcadena}</span>
      </React.Fragment>
    );
  });
};

export default Highlight;
