import React from "react";
const Articulo = prop => {
  const { art, lan, folder } = prop;
  return (
    <div className="row bg-light">
      <div className="col-3 col-md-2 col-lg-1 bg-light d-flex align-self-stretch align-items-center px-4">
        <h2 className="">{art.cod}</h2>
      </div>
      <div className="col-9 col-md-10 col-lg-3 bg-light align-self-stretch my-auto">
        <h5>
          {art.desc[lan].split("#").map(line => (
            <span>
              {line}
              <br />
            </span>
          ))}
        </h5>
      </div>
      <div className="col-12 col-sm-10 col-md-9 col-lg-8 bg-light mx-auto align-self-stretch align-items-center">
        <div className="row d-flex justify-content-center">
          {art.imagenes
            ? art.imagenes.map(img => (
                <div className="col-7 col-sm-6 col-md-4 col-lg-3 p-3">
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
