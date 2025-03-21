import React from "react";
import ItemQuality from "./itemQuality";
import t from "./qualitySection.lit.json"
const QualitySection = props => {
    const {lan, windowWidth, windowHeight} = props;
    //const { art, lan, folder, BSBreak } = prop;
    return (
      <div id="qualitySection" className="bg-white w-100 mt-0 mt-md-3 ">
          <div className="mx-lg-5 mx-md-3  ">
            <div className="sectionContainer bg-white min-vh-50  ">
                <div className="qualityContainer  text-center  mx-0 h-100 ">
                    <div className="titulosQuality p-4">
                             <h1 className="h1">{t.H1[lan]}</h1>
                             <p className="ParagraphQuality text-secondary">{t.PA[lan]}</p>
                    </div>
        
                    <div className="m-0 p-0 h-100 bg-white d-md-flex mt-2  ">



                        <div className="divImagen bg-white col-12 order-md-2 col-md-6 px-0 mx-0 px-md-3">
                          
                               <img src="/resources/img/calidad/Calidad1.jpg"  className="w-100 imagenCalidad2 " alt="" />
                        </div>

                        <div className="divTextos col-12 bg-white order-md-1 col-md-6 p-0 p-md-6 mb-2">
                          {

                              t.items.map((item)=>{
                                return(
                                  <ItemQuality windowWidth={windowWidth}
                                      windowHeight={windowHeight}
                                      lan={lan}
                                      item={item} >
                                  </ItemQuality>
                                )



                              })

                          }
                          

                        </div>

                      
                            
                     </div>
                    <div className="py-3 mb-2">
                    <a href="#seccionColecciones" class="btn btn-primary btn-lg " role="button" aria-disabled="false">{t.BU[lan]}</a>
                    </div>

                </div>
                
            </div>
          </div>
     </div>
    );
  };
  
  export default QualitySection;