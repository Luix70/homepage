import React from "react";
const ItemQuality = props => {
    const {lan, item} = props;
    //const { art, lan, folder, BSBreak } = prop;
    return (
        <div className="d-flex justify-content-start align-items-center py-1">
            <div className="w-25 "><img className="img-fluid mx-2" src={"/resources/img/calidad/"+ item.img } alt="" width="100px" /></div> 
            <div className="w-75 text-left mx-2 px-2">{item.copy[lan]}</div>
        </div>

     );
  };

  export default ItemQuality
