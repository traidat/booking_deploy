import React from "react";
import MyGoogleMap from "./MyGoogleMap";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const Map = () => {
  // const MapWithAMarker = withScriptjs(
  //   withGoogleMap((props) => (
  //     <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
  //       <Marker position={{ lat: -34.397, lng: 150.644 }} />
  //     </GoogleMap>
  //   ))
  // );

  return (
    // <MapWithAMarker
    //   googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1s22NLGd7YfajufOXv95be_581Vzq2NY&v=3.exp&libraries=geometry,drawing,places"
    //   loadingElement={<div style={{ height: `100%` }} />}
    //   containerElement={<div style={{ height: `400px` }} />}
    //   mapElement={<div style={{ height: `100%` }} />}
    // />
    <div className="main-wrapper">
        <br/>
        <MyGoogleMap/>
    </div>
  );
};

export default Map;
