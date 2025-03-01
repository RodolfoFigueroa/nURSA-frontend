import { ReactElement } from "react";

import { Layer } from "deck.gl";
import DeckGL from '@deck.gl/react';
import { Map } from "react-map-gl/maplibre";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import MyNavbar from "./navbar";
import { Spinner } from "react-bootstrap";


interface MyMapProps {
    is_loading: boolean;
    lon: number;
    lat: number;
    layers: Array<Layer>;
}


interface LoadingMapLegendProps extends MyMapProps {
    legend: ReactElement;
    title: string;
}

interface MapTabsContainerProps {
    map: ReactElement;
    tabs: ReactElement;
}


interface Category {
    color: string;
    label: string;
}


interface ContinuousLegendProps {
    colors: Array<string>;
    vmin: number | string;
    vmax: number | string;
    vcenter: number | string;
}


interface CategoricalLegendProps {
    categories: Array<Category>;
}


function CategoricalLegend(props: CategoricalLegendProps) {
    return <div className="d-flex flex-wrap justify-content-between w-100">
        {props.categories.map((item, index) => (
            <div key={index} className="d-flex align-items-center me-3">
                <span
                    style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: item.color,
                        display: "inline-block",
                        marginRight: "8px",
                        borderRadius: "3px",
                        verticalAlign: "middle",
                        borderColor: "gray",
                        borderStyle: "solid",
                        borderWidth: "1px"
                    }}
                ></span>
                <span className="d-flex align-middle">{item.label}</span>
            </div>
        ))}
    </div>
}


function ContinuousLegend(props: ContinuousLegendProps) {
    return <div className="d-flex flex-column align-items-center w-100">
        <div
            style={{
                width: "100%",
                height: "20px",
                background: `linear-gradient(to right, ${props.colors.toString()})`,
                borderRadius: "5px",
                position: "relative"
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    marginTop: "5px"
                }}
            >
                {props.vcenter}
            </span>
        </div>

        <div className="d-flex justify-content-between w-100 mt-1">
            <span>{"<"}{props.vmin}</span>
            <span>{">"}{props.vmax}</span>
        </div>
    </div>
}


function MyMap(props: MyMapProps) {
    return <div className="flex-grow-1 position-relative">
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
}


function LoadingMapWithLegend(props: LoadingMapLegendProps) {
    if (props.is_loading) {
        return <Spinner />
    } else{
        return <div className="d-flex flex-column h-100 w-100">
            <MyMap is_loading={props.is_loading} lon={props.lon} lat={props.lat} layers={props.layers} />
            <Card className="mt-2 p-2 legend-card">
                <div className="fw-bold">{props.title}</div>
                <Card.Body className="w-100 d-flex align-items-center">
                    {props.legend}
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

export { ContinuousLegend, CategoricalLegend, LoadingMapWithLegend, MapTabsContainer };
export type {ContinuousLegendProps} ;