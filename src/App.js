import { useState, useEffect, useRef } from "react";
import "./App.css";
import ReactMapGL, { NavigationControl, FlyToInterpolator } from "react-map-gl";
import Sidebar from "./Components/Sidebar";

function App() {
    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const [viewport, setViewport] = useState({
        latitude: 51.541,
        longitude: -0.1429,
        width: "100%",
        height: "100%",
        zoom: 16,
    });

    const changeView = (type, value) => {
        type === "lat"
            ? setViewport({
                  ...viewport,
                  latitude: +value,
                  transitionDuration: 2000,
                  transitionInterpolator: new FlyToInterpolator(),
              })
            : setViewport({
                  ...viewport,
                  longitude: +value,
                  transitionDuration: 2000,
                  transitionInterpolator: new FlyToInterpolator(),
              });
    };

    return (
        <div className="wrapper">
            <div className="map">
                <Sidebar
                    lat={viewport.latitude}
                    lng={viewport.longitude}
                    changeView={changeView}
                    zoom={viewport.zoom.toFixed(2)}
                />
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={accessToken}
                    mapStyle="mapbox://styles/hannah-developer/cknrt5a4011lh17mseb8f1kt4"
                    onViewportChange={viewport => setViewport(viewport)}
                >
                    <div className="controller">
                        <NavigationControl />
                    </div>
                </ReactMapGL>
            </div>
        </div>
    );
}

export default App;
