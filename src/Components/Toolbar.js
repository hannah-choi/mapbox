import React, { useState, useEffect, useRef } from "react";
import NumericInput from "react-numeric-input";

export default function Toolbar({ lng, lat, zoom, changeView }) {
    const [alert, setAlert] = useState("");
    const alertRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert("");
            alertRef.current.className = "alert";
        }, 4000);
        return () => clearTimeout(timer);
    }, [alert]);

    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(lng);

    const isLatitude = num => {
        return isFinite(num) && Math.abs(num) <= 90;
    };

    const isLongitude = num => {
        return isFinite(num) && Math.abs(num) <= 180;
    };

    return (
        <header className="toolbar">
            <div
                ref={alertRef}
                className={alert ? "alert visible" : "alert"}
                message={alert}
            >
                {alert}
            </div>
            Latitude:{" "}
            <NumericInput
                data-name="lat"
                value={latitude}
                step={0.01}
                min={-90}
                max={90}
                required
                onChange={value => {
                    if (value && isLatitude(value)) {
                        setLatitude(value);
                        changeView("lat", value);
                    } else {
                        setAlert("Invalid latitude");
                    }
                }}
            />{" "}
            | Longitude:{" "}
            <NumericInput
                data-name="lng"
                value={longitude}
                step={0.01}
                min={-180}
                max={180}
                required
                onChange={value => {
                    if (value && isLongitude(value)) {
                        setLongitude(value);
                        changeView("lng", value);
                    } else {
                        setAlert("Invalid longitude");
                    }
                }}
            />{" "}
            | Zoom: {zoom}
        </header>
    );
}
