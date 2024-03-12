import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
class Mapa extends Component {
  render() {
    const { coordenadasCentro, coordenadasMarker, zoom } = this.props;

    return (
      <div className="ubicacion">
        <Map
          google={this.props.google}
          zoom={zoom}
          initialCenter={coordenadasCentro}
          onClick={this.onMapClicked}
        >
          <Marker position={coordenadasMarker}></Marker>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAFAiTuByNeZlrXqcmzihMGjN8rUOsLJPc"
})(Mapa);
