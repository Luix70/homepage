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
// import Direcciones from "./common/direcciones.jsx";

const Footer = props => {
  const { lan } = props;
  return (
    <div className="row w-100 mx-0 bg-dark">
      {/* <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5">
        <Direcciones lan={lan}></Direcciones>
      </div> */}

      {/* <div className="bg-dark text-light col-xs-12 col-sm-6 col-md-4 container pt-3 pb-5 nodecoration"> */}
      <div className="bg-dark text-light col-12  container pt-3 pb-5 nodecoration">
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
