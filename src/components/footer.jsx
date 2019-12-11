import React from "react";
import {
  Whatsapp,
  Facebook,
  Twitter,
  Pinterest,
  Mail,
  Telegram,
  Linkedin,
  Tumblr
} from "react-social-sharing";
const Footer = () => {
  return (
    <div className="row w-100 mx-0 bg-dark">
      <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5">
        <object
          type="image/svg+xml"
          data="/resources/img/logoIndesan_animated.svg"
          className="logo h-25"
          aria-label="logo"
        ></object>

        <ul className="list-group list-group-inverse direccion">
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
      <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5 nodecoration">
        <h5>Compártenos en:</h5>
        <Whatsapp
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Whatsapp"
        ></Whatsapp>

        <Facebook
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Facebook"
        ></Facebook>

        <Twitter
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Twitter"
        ></Twitter>

        <Pinterest
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Pinterest"
        ></Pinterest>

        <Mail
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Mail"
        ></Mail>

        <Telegram
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Telegram"
        ></Telegram>

        <Tumblr
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Tumblr"
        ></Tumblr>

        <Linkedin
          solid
          medium
          link="https://indesan.org"
          message="Compartir en Linkedin"
        ></Linkedin>
      </div>
    </div>
  );
};

export default Footer;
