import { useEffect, useState, useCallback } from "react";
import Geocode from "react-geocode";
import AutoComplete from "react-google-autocomplete";
import Nav from "../components/Nav";
import { coordsObject } from "../coordinates";

import useMoveMarker from "../helper/useMoveMarker";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Polygon,
  InfoWindow,
} from "@react-google-maps/api";
import LogoMarker from "../images/marker.png";
import { useSelector, useDispatch } from "react-redux";
import { getLocationUser } from "../redux/actions/locationAction";
import UserInfoWindow from "../components/UserInfoWindow";

export default function Monitoring() {
  const { location, auth } = useSelector((state) => state);

  const [activeMarker, setActiveMarker] = useState(null);

  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
  Geocode.enableDebug();

  const userLocation = useCallback(getLocationUser({ auth }), []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(userLocation);
      console.log(location?.location, "THIS IS LOCATION DATAS");
    }, 1000 * 10); //every 30 seconds send a location
    return () => clearInterval(interval);
  }, [location.location]);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  function TravellingMarker({ position, data }) {
    let [coordinates, setDestination] = useMoveMarker([
      position?.lat,
      position?.lng,
    ]);

    useEffect(() => {
      setDestination([position?.lat, position?.lng]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    return (
      <Marker
        position={{
          lat: coordinates?.[0],
          lng: coordinates?.[1],
        }}
        onClick={() => handleActiveMarker(data.userId._id)}
        icon={LogoMarker}
        // {...rest}
      >
        {activeMarker === data.userId._id ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <UserInfoWindow userData={data.userId} />
          </InfoWindow>
        ) : null}
      </Marker>
    );
  }

  return (
    <div className="flex flex-col items-center transition-all">
      <Nav />
      <div className="w-full max-w-5xl">
        <h2 className="my-4 font-semibold text-xl">MONITORING</h2>
        <div className="flex ">
          {loadError && <p>{loadError}</p>}
          {!isLoaded && <p>Loading .. </p>}

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100vh" }}
              zoom={15.7}
              center={{ lat: -6.238384, lng: 106.772378 }}
              onClick={(e) => {
                setActiveMarker(null);
              }}
            >
              <Polygon
                paths={coordsObject}
                options={{
                  strokeColor: "#F36C1D",
                  strokeWeight: 2,
                  fillColor: "#F36C1D",
                  fillOpacity: 0.1,
                }}
              />
              {location?.location?.map((value, index) => {
                return (
                  <TravellingMarker
                    key={index}
                    position={{
                      lat: value?.latLngs?.[0],
                      lng: value?.latLngs?.[1],
                    }}
                    data={value}
                  />
                );
              })}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}

const getRandomObject = (array) => {
  const randomObject = array[Math.floor(Math.random() * array.length)];
  return randomObject;
};
