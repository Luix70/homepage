import React from "react";
const Footer = () => {
  return (
    <div className="row w-100 mx-0 bg-dark">
      <div className="bg-dark text-light col-xs-12 col-sm-8  col-md-6 container pt-3 pb-5">
        <object
          type="image/svg+xml"
          data="/resources/img/logoIndesan_animated.svg"
          className="logo"
          aria-label="logo"
        ></object>

        <ul className="list-group list-group-inverse">
          <li className="list-group-item bg-dark   border-0 py-0">
            CIF: B30403968{" "}
          </li>
          <li className="list-group-item bg-dark   border-0 py-0">
            Ctra de Pinoso Km 2{" "}
          </li>
          <li className="list-group-item bg-dark   border-0 py-0">
            30510 Yecla. Murcia. España{" "}
          </li>
          <li className="list-group-item bg-dark   border-0 py-0">
            indesan@indesan.com{" "}
          </li>
          <li className="list-group-item bg-dark   border-0 py-0">
            Tf 968796411{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
