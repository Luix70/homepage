import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
class Mapa extends Component {
  render() {
    const { coordenadasCentro, coordenadasMarker, zoom } = this.props;

    return (
      <div>
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
})(Mapa);
