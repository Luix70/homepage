import React from "react";
import { WhichBotstrapBreak } from "../utils/utilities.js";
const HeroSection = props => {
    const {windowWidth, windowHeight } = props;
    return (
      <div id="heroSection" className="bg-white w-100 ">
        <div className="mx-lg-5 mx-md-3 py-3 ">
            <div className="sectionContainer bg-white min-vh-50 ">
              <div className="heroContainer " style={{backgroundImage: "url(/resources/img/backgrounds/bg1_tn_" + WhichBotstrapBreak(windowWidth, windowHeight) + ".jpg)" }}>
                 <div className="heroOverlay w-100 h-100">
                  <div id="textos" className="col-12 col-md-6 p-4 p-md-4 text-light h-100 ">
                    <img src='/resources/img/logoIndesan_animated.svg' alt="" className="h-33"/>
                    <h2 className="card-title h1">El referente de calidad en mesas de comedor</h2>
                    <p className="card-text h4 font-weight-light font-italic ">Descubre nuestras colecciones de mesas de comedor modernas, construidas con materiales naturales como maderas, cerámicas y estructuras de acero.</p>
                    <a href="/" class="btn btn-primary btn-lg " role="button" aria-disabled="false">Conócenos</a>
                  </div>
                  </div>
                 </div>
             
            </div>
            
        </div>
        
      </div>
    );
  };
  
  export default HeroSection;
  
