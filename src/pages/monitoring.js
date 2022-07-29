import { useEffect, useRef, useState } from "react";
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
} from "@react-google-maps/api";
import LogoMarker from "../images/marker.png";

const latLngs = [
  [-6.2336, 106.767528],
  [-6.242398, 106.770015],
  [-6.240152, 106.777062],
  [-6.234033, 106.777352],
  [-6.233641, 106.772005],
];
const latLngs2 = [
  [-6.2336, 106.767528],
  [-6.240133, 106.7671],
  [-6.240152, 106.777062],
  [-6.241989, 106.768387],
  [-6.233641, 106.772005],
];
const latLngs3 = [
  [-6.243396, 106.771056],
  [-6.242398, 106.770015],
  [-6.242479, 106.776885],
  [-6.241263, 106.773087],
  [-6.233641, 106.772005],
];

export default function Monitoring() {
  const [myLoc, setMyLoc] = useState(null);
  const [myLoc1, setMyLoc1] = useState(null);
  const [myLoc2, setMyLoc2] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
  Geocode.enableDebug();

  useEffect(() => {
    let interval = setInterval(() => {
      let myGut = getRandomObject(latLngs);
      let myGut1 = getRandomObject(latLngs2);
      let myGut2 = getRandomObject(latLngs3);
      setMyLoc(myGut);
      setMyLoc1(myGut1);
      setMyLoc2(myGut2);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
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
              // onClick={(e) => {
              //   setCurrentCoords([e.latLng.lat(), e.latLng.lng()]);
              // }}
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
              {myLoc && myLoc1 && myLoc2 && (
                <>
                  <TravellingMarker
                    position={{
                      lat: myLoc?.[0],
                      lng: myLoc?.[1],
                    }}
                  />
                  <TravellingMarker
                    position={{
                      lat: myLoc1?.[0],
                      lng: myLoc1?.[1],
                    }}
                  />
                  <TravellingMarker
                    position={{
                      lat: myLoc2?.[0],
                      lng: myLoc2?.[1],
                    }}
                  />
                </>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}

function TravellingMarker({ position, ...rest }) {
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
      icon={LogoMarker}
      // {...rest}
    />
  );
}

const getRandomObject = (array) => {
  const randomObject = array[Math.floor(Math.random() * array.length)];
  return randomObject;
};
