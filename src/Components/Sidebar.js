import React from "react";

export default function Sidebar({ lng, lat, zoom }) {
    return (
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    );
}
