import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
class MapaIndesan extends Component {
  render() {
    const { coordenadasCentro, coordenadasMarker, zoom } = this.props;

    return (
      <div className="h-100 w-100">
        <Map
          google={this.props.google}
          zoom={zoom}
          initialCenter={coordenadasCentro}
        >
          <Marker position={coordenadasMarker}></Marker>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCDq6JWDWB7aNTdAnuBhAzNByYC70SsCL4"
})(MapaIndesan);
