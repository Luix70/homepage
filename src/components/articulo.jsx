import React from "react";
const Articulo = prop => {
  const { art, lan, folder, BSBreak } = prop;
  return (
    <div className="row bg-light py-3">
      <div className="col-3 col-md-2 col-lg-1 bg-light d-flex align-self-stretch align-items-center px-0 text-muted">
        <h4 className="text-center w-100 text-monospace">{art.cod}</h4>
      </div>
      <div className="col-9 col-md-10 col-lg-4 bg-light align-self-stretch my-auto pr-0 ">
        <h4 className="text-start text-info">
          {art.desc[lan].split("#").map(line => (
            <small key={line} className="">
              {line}
              {BSBreak === "md" ? null : <br />}
            </small>
          ))}
        </h4>
      </div>
      <div className="col-12 col-sm-10 col-md-9 col-lg-7 bg-light mx-auto align-self-stretch align-items-center pr-5">
        <div className="row d-flex justify-content-around">
          {art.imagenes
            ? art.imagenes.map(img => (
                <div
                  key={art.imagenes.indexOf(img)}
                  className="col-7 col-sm-6 col-md-4 col-lg-3 p-3 "
                >
                  {
                    <img
                      src={folder + img}
                      alt={img}
                      className=" w-100 h-100 mx-2"
                    />
                  }
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Articulo;
