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
import { MobileView } from "react-device-detect";

import t from "./footer.lit.json";
import MaterialIcon from "react-google-material-icons";

const Footer = props => {
  const { lan } = props;
  return (
    <div className="row w-100 mx-0 bg-dark">
      <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5">
        <object
          type="image/svg+xml"
          data="/resources/img/logoIndesan_animated.svg"
          className="logo h-25"
          aria-label="logo"
        ></object>

        <ul className="list-group list-group-inverse direccion  lead">
          {/* <li className="list-group-item bg-dark   border-0 py-0">
            CIF: B30403968{" "}
          </li> */}
          <li className="list-group-item bg-dark   border-0 py-0 d-flex align-items-center">
            <span className="mr-2 ">
              <MaterialIcon icon="location_city" size={16}></MaterialIcon>
            </span>
            <span>Ctra de Pinoso Km 2</span>
          </li>
          <li className="list-group-item bg-dark   border-0 py-0">
            <span className="ml-4"> {t.AD[lan]}</span>
          </li>
          <li className="list-group-item bg-dark   border-0 py-0 d-flex align-items-center">
            <span className="mr-2">
              <MaterialIcon icon="email" size={16}></MaterialIcon>
            </span>
            <span>
              <a
                href="mailto:indesan@indesan.com"
                className="nodecoration text-light"
              >
                indesan@indesan.com
              </a>
            </span>
          </li>
          <li className="list-group-item bg-dark   border-0 py-0 d-flex align-items-center">
            <span className="mr-2">
              <MaterialIcon icon="phone" size={16}></MaterialIcon>
            </span>
            <span>
              <a href={"tel:" + t.TE[lan]} className="nodecoration text-light">
                {t.TE[lan]}
              </a>
            </span>
          </li>
        </ul>
      </div>
      <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5 nodecoration">
        <h5 className="lead">{t.CN[lan]}</h5>
        <MobileView>
          <Whatsapp
            solid
            medium
            link="https://indesan.org"
            message="Compartir en Whatsapp"
          ></Whatsapp>
        </MobileView>

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
        <h5 className="lead">{t.SN[lan]}</h5>
        <a href="https://www.facebook.com/ComercialIndesan/">
          <img
            src={`/resources/img/fb_${lan}.png`}
            alt="facebook"
            width="256px"
            height="auto"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
