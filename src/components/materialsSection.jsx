import React from "react";
import { WhichBotstrapBreak } from "../utils/utilities.js";
import t from "./materialsSection.lit.json"
const MaterialsSection = props => {
    const {windowWidth, windowHeight ,lan} = props;
    //const { art, lan, folder, BSBreak } = prop;
    return (
      <div id="materialsSection" className="bg-white w-100 mt-0 mt-md-3 ">
          <div className="mx-lg-5 mx-md-3  ">
          <div className="sectionContainer bg-white min-vh-50  ">
            <div className="materialsContainer border-primary text-center  px-5">
              <h1 className="h2  pt-2 pt-m-2 pt-lg-5 mt-3">{t.H1[lan]}</h1>
              <p className="text-secondary">
                {t.PA[lan]}
              </p>

              <div className=" pb-5 d-flex flex-column flex-sm-row align-items-center" >
              
              <div className="col-12 col-sm-4 p-0">
                <div className="bg-white  d-block m-0 p-0  imagenCalidadContainer">
                   <img src="/resources/img/calidad/mineral2.jpg" className="w-100 imagenCalidad " alt="mineral2.jpg" />
                </div>
                <div className="bg-white  d-block m-0 p-0 imagenCalidadContainer">
                  <img src="/resources/img/calidad/madera.jpg" className="w-100 imagenCalidad " alt="madera.jpg" />
                </div>

              </div>

              

              <div className="col-12 col-sm-4 p-0">
                <div className="bg-white   d-block m-0 p-0 imagenCalidadContainer">
                   <img src="/resources/img/calidad/metal.jpg" className="w-100 imagenCalidad " alt="metal.jpg" />
                </div>
                <div className="bg-white   d-block m-0 p-0 imagenCalidadContainer">
                  <img src="/resources/img/calidad/mineral.jpg" className="w-100 imagenCalidad " alt="mineral.jpg" />
                </div>
              
                </div>


              <div className="col-12 col-sm-4 p-0">
           
                 <div className="bg-white   d-block m-0 p-0 imagenCalidadContainer">
                   <img src="/resources/img/calidad/metal2.jpg" className="w-100 imagenCalidad " alt="metal2.jpg" />
                </div>
                <div className="bg-white   d-block m-0 p-0 imagenCalidadContainer">
                  <img src="/resources/img/calidad/madera2.jpg" className="w-100 imagenCalidad " alt="madera2.jpg" />
                </div>
                
                </div>

              </div>
              

            </div>
               
          </div>
        </div>
      </div>
    );
  };
  
  export default MaterialsSection;