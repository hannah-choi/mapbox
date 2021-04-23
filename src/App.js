import { useState } from "react";
import "./App.css";
import ReactMapGL, {
    NavigationControl,
    FlyToInterpolator,
    Marker,
    Popup,
} from "react-map-gl";
import Toolbar from "./Components/Toolbar";

function App() {
    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    const [viewport, setViewport] = useState({
        latitude: 51.541,
        longitude: -0.1429,
        width: "100%",
        height: "100%",
        zoom: 16,
    });

    const [selected, setSelected] = useState(null);

    const changeView = (type, val) => {
        if (type === "lat") {
            setViewport({
                ...viewport,
                latitude: +val,
                transitionDuration: 1000,
                transitionInterpolator: new FlyToInterpolator(),
            });
        } else {
            setViewport({
                ...viewport,
                longitude: +val,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            });
        }
    };

    const officeList = [
        { name: "London Office", location: [51.541, -0.1429] },
        { name: "Tel Aviv Office", location: [31.7971, 35.2403] },
    ];

    return (
        <div className="wrapper">
            <section className="map">
                <Toolbar
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
                    <button className="controller">
                        <NavigationControl />
                    </button>
                    {viewport.zoom > 5 &&
                        officeList.map((office, i) => (
                            <Marker
                                key={i}
                                latitude={office.location[0]}
                                longitude={office.location[1]}
                            >
                                <button
                                    className="pointer"
                                    onClick={() => {
                                        !selected
                                            ? setSelected(office)
                                            : setSelected(null);
                                    }}
                                    style={{
                                        width: viewport.zoom * 2.3,
                                        height: viewport.zoom * 2,
                                    }}
                                />
                            </Marker>
                        ))}
                    {selected && (
                        <Popup
                            offsetLeft={viewport.zoom * 1.1}
                            offsetTop={viewport.zoom * -0.5}
                            latitude={selected.location[0]}
                            longitude={selected.location[1]}
                            className="popup"
                            anchor="bottom"
                            dynamicPosition={false}
                            closeButton={true}
                            onClose={() => setSelected(null)}
                        >
                            <div>{selected.name}</div>
                        </Popup>
                    )}
                </ReactMapGL>
            </section>
        </div>
    );
}

export default App;
