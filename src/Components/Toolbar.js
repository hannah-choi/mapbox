import React from "react";

export default function Toolbar({ lng, lat, zoom, changeView }) {
    return (
        <header className="toolbar">
            Latitude:{" "}
            <input
                type="number"
                data-name="lat"
                defaultValue={lat}
                step="0.01"
                min="-180"
                max="180"
                onChange={e =>
                    changeView(e.target.dataset.name, e.target.value)
                }
            />{" "}
            | Longitude:{" "}
            <input
                type="number"
                data-name="lng"
                defaultValue={lng}
                step="0.01"
                min="-90"
                max="90"
                onChange={e =>
                    changeView(e.target.dataset.name, e.target.value)
                }
            />{" "}
            | Zoom: {zoom}
        </header>
    );
}
