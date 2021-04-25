import React, { Component, useEffect, useState } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";
import Marker from "./Marker";
import AutoComplete from "./Autocomplete";
import { set } from "lodash";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const ChooseFromMap = ({ la, ln, setla, setln }) => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setmapInstance] = useState();
  const [mapApi, setmapApi] = useState();
  const [geoCoder, setgeoCoder] = useState();
  const [places, setplaces] = useState([]);
  const [center, setcenter] = useState([]);
  const [zoom, setzoom] = useState(15);
  const [address, setaddress] = useState("");
  const [draggable, setdraggable] = useState(true);
  const [lat, setlat] = useState(0);
  const [lng, setlng] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setlng(position.coords.longitude);
      setln(position.coords.longitude);
      setlat(position.coords.latitude);
      setla(position.coords.latitude);
      setcenter([position.coords.latitude, position.coords.longitude]);
      _generateAddress();
    });
  }, [la, ln]);

  const onMarkerInteraction = (childKey, childProps, mouse) => {
    setdraggable(false);
    setlat(mouse.lat);
    setla(lat);
    setlng(mouse.lng);
    setln(lng);
    console.log(ln);
    console.log(la);
  };
  const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    setdraggable(true);
    _generateAddress();
  };

  const _onChange = ({ center, zoom }) => {
    setcenter(center);
    setzoom(zoom);
  };

  const _onClick = (value) => {
    setlat(value.lat);
    setla(lat);
    setlng(value.lng);
    setln(lng);
    console.log(ln);
    console.log(la);
  };

  const apiHasLoaded = (map, maps) => {
    setmapApi(maps);
    setmapInstance(map);
    setMapApiLoaded(true);
    _generateAddress();
  };

  const addPlace = (place) => {
    setplaces([place]);
    setlat(place.geometry.location.lat());
    setla(place.geometry.location.lat());
    setlng(place.geometry.location.lng());
    setln(place.geometry.location.lng());
    _generateAddress();
  };
  const _generateAddress = () => {
    if (mapApi) {
      const geocoder = new mapApi.Geocoder();
      geocoder.geocode({ location: { lat: lat, lng } }, (results, status) => {
        if (status == "OK") {
          if (results[0]) {
            setaddress(results[0].formatted_address);
          } else {
            window.alert("No results found");
          }
        } else {
            setTimeout(() => {
                
            }, 2000);
        //   window.alert("Geocoder failed due to: " + status);
        }
      });
    }
  };

  return (
    <Wrapper>
      {/* {
        <div>
          <AutoComplete map={mapInstance} mapApi={mapApi} addplace={addPlace} />
        </div>
      } */}
      <GoogleMapReact
        center={center}
        zoom={zoom}
        draggable={draggable}
        onChange={_onChange}
        onChildMouseDown={onMarkerInteraction}
        onChildMouseUp={onMarkerInteractionMouseUp}
        onChildMouseMove={onMarkerInteraction}
        onChildClick={() => console.log("child click")}
        onClick={_onClick}
        bootstrapURLKeys={{
          key: "AIzaSyDGwmKwnOUOk6VT-rnSRz08SwAYiilmuqc",
          libraries: ["places", "geometry"],
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        <Marker text={address} lat={lat} lng={lng} />
      </GoogleMapReact>

      <div className="info-wrapper">
        <div className="map-details">
          Address: <span>{address}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ChooseFromMap;

// class ChooseFromMap extends Component {


//     state = {
//         mapApiLoaded: false,
//         mapInstance: null,
//         mapApi: null,
//         geoCoder: null,
//         places: [],
//         center: [],
//         zoom: 9,
//         address: '',
//         draggable: true,
//         lat: null,
//         lng: null
//     };

//     componentWillMount() {
//         this.setCurrentLocation();
//     }


//     onMarkerInteraction = (childKey, childProps, mouse) => {
//         this.setState({
//             draggable: false,
//             lat: mouse.lat,
//             lng: mouse.lng
//         });
//     }
//     onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
//         this.setState({ draggable: true });
//         this._generateAddress();
//     }

//     _onChange = ({ center, zoom }) => {
//         this.setState({
//             center: center,
//             zoom: zoom,
//         });

//     }

//     _onClick = (value) => {
//         this.setState({
//             lat: value.lat,
//             lng: value.lng
//         });
//     }

//     apiHasLoaded = (map, maps) => {
//         this.setState({
//             mapApiLoaded: true,
//             mapInstance: map,
//             mapApi: maps,
//         });

//         this._generateAddress();
//     };

//     addPlace = (place) => {
//         this.setState({
//             places: [place],
//             lat: place.geometry.location.lat(),
//             lng: place.geometry.location.lng()
//         });
//         this._generateAddress()
//     };

//     _generateAddress() {
//         const {
//             mapApi
//         } = this.state;

//         const geocoder = new mapApi.Geocoder;

//         geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
//             console.log(results);
//             console.log(status);
//             if (status === 'OK') {
//                 if (results[0]) {
//                     this.zoom = 12;
//                     this.setState({ address: results[0].formatted_address });
//                 } else {
//                     window.alert('No results found');
//                 }
//             } else {
//                 window.alert('Geocoder failed due to: ' + status);
//             }

//         });
//     }

//     // Get Current Location Coordinates
//     setCurrentLocation() {
//         if ('geolocation' in navigator) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 this.setState({
//                     center: [position.coords.latitude, position.coords.longitude],
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 });
//             });
//         }
//     }

//     render() {
//         const {
//             places, mapApiLoaded, mapInstance, mapApi,
//         } = this.state;


//         return (
//             <Wrapper>
//                 {mapApiLoaded && (
//                     <div>
//                         <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
//                     </div>
//                 )}
//                 <GoogleMapReact
//                     center={this.state.center}
//                     zoom={this.state.zoom}
//                     draggable={this.state.draggable}
//                     onChange={this._onChange}
//                     onChildMouseDown={this.onMarkerInteraction}
//                     onChildMouseUp={this.onMarkerInteractionMouseUp}
//                     onChildMouseMove={this.onMarkerInteraction}
//                     onChildClick={() => console.log('child click')}
//                     onClick={this._onClick}
//                     bootstrapURLKeys={{
//                         key: 'AIzaSyAM9uE4Sy2nWFfP-Ha6H8ZC6ghAMKJEKps',
//                         libraries: ['places', 'geometry'],
//                     }}
//                     yesIWantToUseGoogleMapApiInternals
//                     onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
//                 >

//                     <Marker
//                         text={this.state.address}
//                         lat={this.state.lat}
//                         lng={this.state.lng}
//                     />


//                 </GoogleMapReact>

//                 <div className="info-wrapper">
//                     <div className="map-details">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div>
//                     <div className="map-details">Zoom: <span>{this.state.zoom}</span></div>
//                     <div className="map-details">Address: <span>{this.state.address}</span></div>
//                 </div>


//             </Wrapper >
//         );
//     }
// }

// export default ChooseFromMap;
