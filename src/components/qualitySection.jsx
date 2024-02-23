import React from "react";
import { WhichBotstrapBreak_width } from "../utils/utilities.js";
import t from "./qualitySection.lit.json"
const QualitySection = props => {
    const {windowWidth, windowHeight ,lan} = props;
    //const { art, lan, folder, BSBreak } = prop;
    return (
      <div id="qualitySection" className="bg-secondary w-100 mt-0 mt-md-3 ">
          <div className="mx-lg-5 mx-md-3  ">
            <div className="sectionContainer bg-white min-vh-50  ">
                <div className="qualityContainer  text-center  mx-0 h-100 ">
                    <div className="titulosQuality p-4">
                             <h1 className="h1">{t.H1[lan]}</h1>
                             <p className="ParagraphQuality text-secondary">{t.PA[lan]}</p>
                    </div>
        
                    <div className="m-0 p-0 h-100 bg-success d-md-flex mt-2 h-100">



                        <div className="divImagen bg-white col-12 order-md-2 col-md-6">
                            
                        
                                <img src="/resources/img/calidad/Calidad1.jpg"  className="w-100 imagenCalidad" alt="" />
                               
                            

                        </div>

                        <div className="divTextos col-12 bg-light order-md-1 col-md-6">
                            

                        </div>
                            
                     </div>
                    

                </div>
                
            </div>
          </div>
     </div>
    );
  };
  
  export default QualitySection;