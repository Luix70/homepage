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
import {
  MobileView,
  BrowserView,
  isAndroid,
  isIOS //,  deviceDetect
} from "react-device-detect";

import t from "./footer.lit.json";
// import Direcciones from "./common/direcciones.jsx";

const Footer = props => {
  const { lan } = props;
  // console.log(deviceDetect());
  return (
    <div className="row w-100 mx-0 bg-dark">
      {/* <div className="bg-dark text-light col-xs-6 col-sm-6 col-md-4 container pt-3 pb-5">
        <Direcciones lan={lan}></Direcciones>
      </div> */}

      {/* <div className="bg-dark text-light col-xs-12 col-sm-6 col-md-4 container pt-3 pb-5 nodecoration"> */}
      <div className="bg-dark text-light col-12  container p-5 pb-5 nodecoration">
        <h5 className="lead">{t.CN[lan]}</h5>
        <MobileView>
          <Whatsapp
            solid
            medium
            link="https://indesan.com"
            message="Compartir en Whatsapp"
          ></Whatsapp>
        </MobileView>

        <Facebook
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Facebook"
        ></Facebook>

        <Twitter
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Twitter"
        ></Twitter>

        <Pinterest
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Pinterest"
        ></Pinterest>

        <Mail
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Mail"
        ></Mail>

        <Telegram
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Telegram"
        ></Telegram>

        <Tumblr
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Tumblr"
        ></Tumblr>

        <Linkedin
          solid
          medium
          link="https://indesan.com"
          message="Compartir en Linkedin"
        ></Linkedin>
        <h5 className="lead">{t.SN[lan]}</h5>
        <BrowserView>
          <a href="https://www.facebook.com/ComercialIndesan/">
            <img
              src={`/resources/img/fb_${lan}.png`}
              alt="facebook"
              width="256px"
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
                width="256px"
                height="auto"
              />
            </a>
          ) : isIOS ? (
            <a href="fb://profile/247180775370248">
              <img
                src={`/resources/img/fb_${lan}.png`}
                alt="facebook"
                width="256px"
                height="auto"
              />
            </a>
          ) : (
            <a href="https://www.facebook.com/ComercialIndesan/">
              <img
                src={`/resources/img/fb_${lan}.png`}
                alt="facebook"
                width="256px"
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
