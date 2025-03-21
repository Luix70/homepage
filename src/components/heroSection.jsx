import React from "react";
import { WhichBotstrapBreak } from "../utils/utilities.js";
import t from "./heroSection.lit.json"
const HeroSection = props => {
    const {windowWidth, windowHeight ,lan} = props;
    return (
      <div id="heroSection" className="bg-white w-100 mt-0 mt-md-3">
        <div className="mx-lg-5 mx-md-3  ">
            <div className="sectionContainer bg-white min-vh-50 ">
              <div className="heroContainer " style={{backgroundImage: "url(/resources/img/backgrounds/bg1_tn_" + WhichBotstrapBreak(windowWidth, windowHeight) + ".jpg)" }}>
                 <div className="heroOverlay w-100 h-100">
                  <div id="textos" className="col-12 col-md-6 p-4 p-md-4 text-light h-100 ">
                    <img src='/resources/img/logoIndesan_animated.svg' alt="" className="h-33"/>
                    <h2 className="card-title h1 my-4 text-light">{t.HE[lan]}</h2>
                    <p className="card-text h5 my-4 font-weight-lighter font-italic">{t.SH[lan]}</p>
                    <a href="#seccionColecciones" class="btn btn-primary btn-lg " role="button" aria-disabled="false">{t.BU[lan]}</a>
                  </div>
                  </div>
                 </div>
             
            </div>
            
        </div>
        
      </div>
    );
  };
  
  export default HeroSection;
  
