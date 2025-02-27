import { BitmapLayer } from 'deck.gl';
import DeckGL from '@deck.gl/react';
import { Map } from "react-map-gl/maplibre";


interface SUHIMapProps {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    year: number;
    season: string;
}

function SUHIMap(props: SUHIMapProps){
    const response_json = fetch(
        "http://localhost:8000/suhi/plot",
        {
            method: "POST",
            body: JSON.stringify({
                xmin: props.xmin,
                ymin: props.ymin,
                xmax: props.xmax,
                ymax: props.ymax,
                year: props.year,
                season: props.season
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response => response.json())

    const image_data = response_json.then(function(x) {
        return {
            width: x["width"],
            height: x["height"],
            data: new Uint8Array(x["data"])
        }
    })

    
    const layers = [
        new BitmapLayer({
            id: "BitmapLayer",
            bounds: [props.xmin, props.ymin, props.xmax, props.ymax],
            image: image_data,
            opacity: 0.4
        }),
    ]

    return <DeckGL
        initialViewState={{
            longitude: (props.xmin + props.xmax) / 2,
            latitude: (props.ymin + props.ymax) / 2,
            zoom: 9
        }}
        controller
        layers={layers}
    >
        <Map mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json/" />;
    </DeckGL>
}

export default SUHIMap;