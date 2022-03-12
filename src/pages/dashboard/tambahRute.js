import React, { useState, useEffect } from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";
import markerIcon from "../../images/marker_tambahrute.png";
import { coordsArrays } from "../../coordinates";
import {
  postWilayah,
  updateWilayah,
  getWilayah,
  deleteWilayah,
} from "../../redux/actions/wilayahAction";

import { useSelector, useDispatch } from "react-redux";

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polygon,
  FeatureGroup,
  Marker,
  Popup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import Geocode from "react-geocode";
import { LoadingComponent } from "../../components/LoadingBar";

function createIcon({ url, size, anchor }) {
  return L.icon({
    iconUrl: url,
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -28],
  });
}

const TambahRute = () => {
  const [center] = useState([-6.238512, 106.772722]);
  const [polygondDraw, setPolygonDraw] = useState([]);
  const [markerDraw, setMarkerDraw] = useState([]);

  const { auth, wilayah, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(wilayah);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
  Geocode.enableDebug();

  useEffect(() => {
    if (auth.token) {
      dispatch(getWilayah({ auth }));
    }
    console.log(wilayah?.wilayah?.[0]?.marker);
  }, [dispatch, auth.token]);

  //get center of polygon
  var getCentroid = function (arr) {
    return arr.reduce(
      function (x, y) {
        return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
      },
      [0, 0]
    );
  };

  const _onCreate = (e) => {
    // console.log("On Create : ", e);

    const { layer, layerType } = e;

    if (layerType === "polygon") {
      const { _leaflet_id, _latlngs } = layer;
      let newLatLngs = _latlngs[0];

      // Converting JSON Array into multidimentional Array
      const newArr = Object.keys(newLatLngs).map(function (data) {
        // console.log(data);
        return [newLatLngs[data].lat, newLatLngs[data].lng];
      });

      setPolygonDraw((layers) => [
        ...layers,
        {
          id: _leaflet_id,
          latlngs: newArr,
        },
      ]);
      // console.log(newArr);
    }

    if (layerType === "marker") {
      const { _leaflet_id, _latlng } = layer;
      const namaWilayah = prompt("Masukan nama wilayah:");
      let num = 1;

      // console.log(_latlng.lat);
      Geocode.fromLatLng(_latlng.lat, _latlng.lng)
        .then((res) => {
          const alamat = res.results[0].formatted_address;
          setMarkerDraw((layers) => [
            ...layers,
            {
              id: _leaflet_id,
              latlng: _latlng,
              namaWilayah: namaWilayah ? namaWilayah : `Wilayah-${num++}`,
              alamat,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const _onEditPath = (e) => {
    console.log("On Edit Path : ", e);

    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setPolygonDraw((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id ? { ...l, latlngs: [...editing.latlngs[0]] } : l
        )
      );
    });

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMarkerDraw((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id ? { ...l, latlng: editing._marker._latlng } : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log("On Deleted : ", e);

    const {
      layers: { _layers },
    } = e;

    //converting Object into array so we can use map function on it
    Object.values(_layers).map(({ _leaflet_id }) => {
      setPolygonDraw((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
    Object.values(_layers).map(({ _leaflet_id }) => {
      setMarkerDraw((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  const handleSaveData = (e) => {
    e.preventDefault();

    if (wilayah?.wilayah?.wilayah?.length >= 1) {
      if (
        window.confirm(
          "Apakah kamu yakin ingin ingin save wilayah ini?\nData sebelumnya akan hilang dan diganti dengan yang baru"
        )
      ) {
        dispatch(
          updateWilayah({
            auth,
            newWilayah: polygondDraw,
            marker: markerDraw,
            id: wilayah?.wilayah?._id,
          })
        );
        setPolygonDraw([]);
        setMarkerDraw([]);
      }
    } else {
      if (
        window.confirm(
          "Apakah kamu yakin ingin ingin save wilayah ini?\nData sebelumnya akan hilang dan diganti dengan yang baru"
        )
      ) {
        dispatch(
          postWilayah({
            auth,
            newWilayah: polygondDraw,
            marker: markerDraw,
          })
        );
        setPolygonDraw([]);
        setMarkerDraw([]);
      }
    }
  };

  const handleDeleteData = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Apakah anda yakin ingin menghapus semua wilayah?\nSemua wilayah akan terhapus di DB"
      )
    ) {
      dispatch(
        deleteWilayah({
          auth,
          id: wilayah?.wilayah?._id,
        })
      );
    } else {
      console.log("Tidak jadi menghapus");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-5xl ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />
      </div>

      {/* Save Button data */}
      {polygondDraw.length > 0 && (
        <button
          onClick={handleSaveData}
          className="p-2 rounded-full border border-orange-300 text-black text-xs mb-2 px-10 -mt-6 -my-2 
        hover:scale-105 transition hover:bg-orange-500 hover:text-white "
        >
          <p className="text-xs">Simpan wilayah</p>
        </button>
      )}

      {/* Delte Button data */}
      {wilayah?.wilayah?.wilayah?.length >= 1 && (
        <button
          onClick={handleDeleteData}
          className="p-2 rounded-xl border bg-red-200 border-red-300 text-black text-xs mb-2 px-6 -mt-6 -my-2 
        hover:scale-105 transition hover:bg-red-500 hover:text-white self-end mr-2"
        >
          <p className="text-xs">Hapus semua wilayah</p>
        </button>
      )}

      {alert.loading ? (
        <LoadingComponent />
      ) : (
        <MapContainer
          center={center}
          zoom={15.5}
          style={{ width: "100vw", height: 600 }}
        >
          <FeatureGroup>
            <EditControl
              position="topright"
              onEdited={_onEditPath}
              onCreated={_onCreate}
              onDeleted={_onDeleted}
              draw={{
                rectangle: false,
                polyline: false,
                circle: false,
                circlemarker: false,
                // marker: false,
              }}
            />
          </FeatureGroup>
          <TileLayer
            url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mwRBtcfTlRc9dFAjZBEc"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />

          {/* Polygon Cipulir */}
          {coordsArrays.features.map((state, index) => {
            const coordinates = state.geometry.coordinates[0].map((item) => [
              item[1],
              item[0],
            ]);
            return (
              <Polygon
                key={index}
                pathOptions={{
                  fillColor: "#FD8D3C",
                  fillOpacity: 0.3,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: "#FD8D3C",
                }}
                positions={coordinates}
              />
            );
          })}

          {/* Poligon Wilayah */}
          {wilayah?.wilayah?.wilayah?.map((layer, index) => (
            <Polygon
              key={index}
              pathOptions={{
                fillColor: "#65C18C",
                fillOpacity: 0.2,
                weight: 2,
                opacity: 4,
                dashArray: 3,
                color: "#65C18C",
              }}
              positions={layer.latlngs}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    dashArray: "",
                    fillColor: "#65C18C",
                    fillOpacity: 0.5,
                    weight: 2,
                    opacity: 1,
                    color: "white",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillColor: "#65C18C",
                    fillOpacity: 0.2,
                    weight: 2,
                    opacity: 1,
                    dashArray: 1,
                    color: "#65C18C",
                  });
                },
              }}
            />
          ))}

          {/* Marker Wilayah */}
          {wilayah?.wilayah?.marker?.map((marker, index) => (
            <Marker
              key={index}
              position={marker.latlng}
              icon={createIcon({
                url: markerIcon,
                size: [30, 30],
                anchor: [15, 30],
              })}
            >
              <Popup maxWidth={200} zoomAnimation>
                <p>{marker.namaWilayah}</p>
                <p style={{ fontSize: 10 }} className="text-gray-500">
                  {marker.alamat}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* 
      <pre className="text-left text-xs">
        {JSON.stringify(polygondDraw, 0, 2)}
      </pre>
*/}
    </div>
  );
};

export default TambahRute;
