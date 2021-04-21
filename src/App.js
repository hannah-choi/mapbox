import { useState, useEffect, useRef } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";
import Sidebar from "./Components/Sidebar";

function App() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const mapRef = useRef(null);

    const [lat, setLat] = useState(-0.14296254515647888);
    const [lng, setLng] = useState(51.541072845458984);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: "mapbox://styles/hannah-developer/cknrt5a4011lh17mseb8f1kt4",
            center: [lat, lng],
            zoom: zoom,
        });

        map.on("move", () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

        return () => map.remove();
    }, []);

    return (
        <div className="wrapper">
            <Sidebar lat={lat} lng={lng} zoom={zoom} />
            <div className="map" ref={mapRef}></div>
        </div>
    );
}

export default App;
