import React from "react";
import {
  Whatsapp,
  Facebook,
  Twitter,
  Pinterest,
  Mail,
  Telegram,
  Linkedin,
  Tumblr,
} from "react-social-sharing";
import {
  MobileView,
  BrowserView,
  isAndroid,
  isIOS, //,  deviceDetect
} from "react-device-detect";

import t from "./footer.lit.json";
// import Direcciones from "./common/direcciones.jsx";

const Footer = (props) => {
  const { lan } = props;
  // console.log(deviceDetect());
  return (
    <div className="row w-100 mx-0 bg-black">

      {/* <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5">
        <Direcciones lan={lan}></Direcciones>
      </div> */}

      {/* <div className="bg-dark text-light col-xs-12 col-sm-6 col-md-4 container pt-3 pb-5 nodecoration"> */}
      <div className="bg-black text-light col-12 container p-3 pb-3 nodecoration social">
        <h5 className="lead">{t.CN[lan]}</h5>
        <MobileView>
          <Whatsapp
            solid
            small
            link="https://indesan.com"
            message="Compartir en Whatsapp"
            className ="social"
          ></Whatsapp>
        </MobileView>

        <Facebook
          solid
          small
          link="https://indesan.com"
          message="Compartir en Facebook"
          className ="social"
        ></Facebook>

        <Twitter
          solid
          small
          link="https://indesan.com"
          message="Compartir en Twitter"
          className ="social"
        ></Twitter>

        <Pinterest
          solid
          small
          link="https://indesan.com"
          message="Compartir en Pinterest"
          className ="social"
        ></Pinterest>

        <Mail
          solid
          small
          link="https://indesan.com"
          message="Compartir en Mail"
          className ="social"
        ></Mail>

        <Telegram
          solid
          small
          link="https://indesan.com"
          message="Compartir en Telegram"
          className ="social"
        ></Telegram>

        <Tumblr
          solid
          small
          link="https://indesan.com"
          message="Compartir en Tumblr"
          className ="social"
        ></Tumblr>

        <Linkedin
          solid
          small
          link="https://indesan.com"
          message="Compartir en Linkedin"
          className ="social"
        ></Linkedin>

        <h5 className="lead">{t.SN[lan]}</h5>
        <BrowserView>
          <a href="https://www.facebook.com/ComercialIndesan/">
            <img
              src={`/resources/img/fb_${lan}.png`}
              alt="facebook"
              width="128px"
              height="auto"
            />
          </a>
        </BrowserView>
        <MobileView>
          {isAndroid ? (
            <a href="intent://#Intent;package=com.facebook.katana;scheme=fb://profile/247180775370248;end">
              <img
                src={`/resources/img/fb_${lan}.png`}
                alt="facebook"
                width="128px"
              height="auto"
              />
            </a>
          ) : isIOS ? (
            <a href="fb://profile/247180775370248">
              <img
                src={`/resources/img/fb_${lan}.png`}
                alt="facebook"
                width="128px"
              height="auto"
              />
            </a>
          ) : (
            <a href="https://www.facebook.com/ComercialIndesan/">
              <img
                src={`/resources/img/fb_${lan}.png`}
                alt="facebook"
                width="128px"
              height="auto"
              />
            </a>
          )}
        </MobileView>
      </div>
    </div>
  );
};

export default Footer;
