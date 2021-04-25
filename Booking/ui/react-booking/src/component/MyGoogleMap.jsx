import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";

import AutoComplete from "./Autocomplete";
import Marker from "./Marker";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const MyGoogleMap = ({lat, lng, address}) => {
  return (
    <Wrapper>
      <GoogleMapReact
        center={{lat, lng}}
        zoom={15}
        bootstrapURLKeys={{
          key: "AIzaSyDGwmKwnOUOk6VT-rnSRz08SwAYiilmuqc",
          libraries: ["places", "geometry"],
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker
          text={address}
          lat={lat}
          lng={lng}
        />
      </GoogleMapReact>
    </Wrapper>
  );
};

export default MyGoogleMap;
