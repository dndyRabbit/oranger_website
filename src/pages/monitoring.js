import { useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  Polygon,
  InfoWindow,
} from "react-google-maps";
import Geocode from "react-geocode";
import AutoComplete from "react-google-autocomplete";
import Nav from "../components/Nav";
import { coordsObject } from "../coordinates";

const MAP_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const reversedCoords = coordsObject.map((ll) => {
  return { lat: ll.lng, lng: ll.lat };
});

export default function Monitoring() {
  const [states, setStates] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: "100%",
    mapLocation: {
      lat: -6.23682,
      lng: 106.773598,
    },
    markerPosition: {
      lat: -6.23682,
      lng: 106.773598,
    },
  });

  Geocode.setApiKey(MAP_KEY);
  Geocode.enableDebug();
  const gmapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`;

  const onMarkerClicked = (e) => {
    console.log(e);
    setStates({
      mapLocation: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
      markerPosition: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
      zoom: 15,
    });
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: states.mapLocation?.lat,
          lng: states.mapLocation?.lng,
        }}
      >
        <Polygon
          path={reversedCoords}
          options={{
            strokeColor: "#FFA500",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FFA500",
            fillOpacity: 0.05,
          }}
        />
        <Marker
          // draggable={true}
          // onDragEnd={(e) => onMarkerDragEnd(e)}
          onClick={(e) => onMarkerClicked(e)}
          position={{
            lat: states.markerPosition?.lat,
            lng: states.markerPosition?.lng,
          }}
        ></Marker>
      </GoogleMap>
    ))
  );

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-5xl">
        <h2 className="my-4 font-semibold text-xl">MONITORING</h2>
      </div>
      <div className="w-screen">
        <MapWithAMarker
          isMarkerShown
          googleMapURL={gmapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}
