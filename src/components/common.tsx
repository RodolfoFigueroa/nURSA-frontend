import { ReactElement } from "react";

import { Layer } from "deck.gl";
import DeckGL from '@deck.gl/react';
import { Map } from "react-map-gl/maplibre";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import MyNavbar from "./navbar";


interface LoadingMapProps {
    is_loading: boolean;
    lon: number;
    lat: number;
    layers: Array<Layer>;
    legend: ReactElement;
}


interface MapTabsContainerProps {
    map: ReactElement;
    tabs: ReactElement;
}


interface ContinuousLegendProps {
    vmin: number;
    vmax: number;
    vcenter: number;
}


function CategoricalLegend() {
    return <div className="d-flex flex-wrap justify-content-between">
        {[
            { color: "#0000FF", label: "Muy frío" }, 
            { color: "#0055FF", label: "Frío" },
            { color: "#00AAFF", label: "Ligeramente frío" },
            { color: "#00FF55", label: "Templado" },
            { color: "#FFFF00", label: "Ligeramente caliente" },
            { color: "#FF5500", label: "Caliente" },
            { color: "#FF0000", label: "Muy caliente" }
        ].map((item, index) => (
            <div key={index} className="d-flex align-items-center me-3">
                <span
                    style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: item.color,
                        display: "inline-block",
                        marginRight: "8px",
                        borderRadius: "3px",
                        verticalAlign: "middle"
                    }}
                ></span>
                <span className="d-flex align-middle">{item.label}</span>
            </div>
        ))}
    </div>
}


function ContinuousLegend(props: ContinuousLegendProps) {
    return <div className="d-flex flex-column align-items-center">
        <div
            style={{
                width: "100%",
                height: "20px",
                background: "linear-gradient(to right, red, blue)",
                borderRadius: "5px",
                position: "relative"
            }}
        ></div>

        <div className="d-flex justify-content-between w-100 mt-1">
            <span>{props.vmin}</span>
            <span>{props.vcenter}</span>
            <span>{props.vmax}</span>
        </div>
    </div>
}


function LoadingMap(props: LoadingMapProps) {
    if (props.is_loading) {
        return <Spinner animation="border" />;
    } else {
        return <div className="d-flex flex-column h-100 w-100">
            <div className="flex-grow-1 position-relative">
                <DeckGL
                    initialViewState={{
                        longitude: props.lon,
                        latitude: props.lat,
                        zoom: 9
                    }}
                    controller
                    layers={props.layers}
                >
                    <Map mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json/" />
                </DeckGL>
            </div>

            <Card className="mt-2 p-2">
                <Card.Body>
                
                </Card.Body>
            </Card>
        </div>
    }
}


function MapTabsContainer(props: MapTabsContainerProps) {
    return <Container fluid className="d-flex flex-column min-vh-100 min-vw-100">
        <Row>
            <MyNavbar />
        </Row>
        <Row className="flex-grow-1 d-flex">
            <Col className="d-flex flex-column justify-content-center border">
                {props.map}
            </Col>
            <Col className="d-flex flex-column border">
                {props.tabs}
            </Col>
        </Row>
    </Container>
}

export { ContinuousLegend, CategoricalLegend, LoadingMap, MapTabsContainer };