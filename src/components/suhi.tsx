import { BitmapLayer } from 'deck.gl';
import { useEffect, useState } from 'react';
import { LoadingMap } from './common';


interface SUHIMapProps {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    year: number;
    season: string;
    cat_active: boolean;
}


interface ImageData {
    width: number;
    height: number;
    data: Uint8Array;
    bounds: Array<number>;
}


async function fetch_image(url: string, xmin: number, ymin: number, xmax: number, ymax: number, year: number, season: string) {
    return await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify({
                xmin: xmin,
                ymin: ymin,
                xmax: xmax,
                ymax: ymax,
                year: year,
                season: season
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    .then(response => response.json())
    .then(function(response_json) {
        const out: ImageData = {
            width: response_json["width"],
            height: response_json["height"],
            data: new Uint8Array(response_json["data"]),
            bounds: response_json["bounds"],
        }
        return out;
    })
}


async function fetch_images(urls: Array<string>, xmin: number, ymin: number, xmax: number, ymax: number, year: number, season: string) {
    return await Promise.all(urls.map(url => fetch_image(url, xmin, ymin, xmax, ymax, year, season)))
}


function SUHIMap(props: SUHIMapProps){
    const [is_loading, set_is_loading] = useState(false);
    const [image_data, set_image_data] = useState({});
    const [cat_image_data, set_cat_image_data] = useState({});

    useEffect(() => {
        set_is_loading(true);
        (
            fetch_images(
                [
                    "http://localhost:8000/suhi/maps/continuous", 
                    "http://localhost:8000/suhi/maps/categorical"
                ],
                props.xmin,
                props.ymin,
                props.xmax,
                props.ymax,
                props.year,
                props.season
            )
            .then(two_data => {
                set_image_data(two_data[0]);
                set_cat_image_data(two_data[1]);
                set_is_loading(false);
            })
        )
    }, []);
    
    const layers = [
        new BitmapLayer({
            id: "BitmapLayer",
            bounds: [props.xmin, props.ymin, props.xmax, props.ymax],
            image: image_data,
            opacity: 0.4,
            visible: !props.cat_active,
        }),
        new BitmapLayer({
            id: "BitmapLayer",
            bounds: [props.xmin, props.ymin, props.xmax, props.ymax],
            image: cat_image_data,
            opacity: 0.4,
            visible: props.cat_active,
        }),

    ]

    return <LoadingMap is_loading={is_loading} lon={(props.xmin + props.xmax) / 2} lat={(props.ymin + props.ymax) / 2} layers={layers} />
    
}

export default SUHIMap;