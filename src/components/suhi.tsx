import { BitmapLayer } from 'deck.gl';
import { useEffect, useState } from 'react';
import { CategoricalLegend, ContinuousLegend, ContinuousLegendProps, LoadingMapWithLegend } from './common';


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
    const [continuous_legend_data, set_continuous_legend_data] = useState<ContinuousLegendProps>({vmin: 0, vcenter: 0, vmax: 0, colors: []});

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
            .then(function(merged_data) {
                const cont_data = merged_data[0];
                const cat_data = merged_data[1];
                set_image_data(cont_data);
                set_cat_image_data(cat_data);
                set_is_loading(false);
                console.log(cont_data.bounds);
                set_continuous_legend_data({
                    vmin: Math.round(cont_data.bounds[0]),
                    vcenter: Math.round((cont_data.bounds[0] + cont_data.bounds[1]) / 2),
                    vmax: Math.round(cont_data.bounds[1]),
                    colors: ["#2166ac", "#67a9cf", "#d1e5f0", "#f7f7f7", "#fddbc7", "#ef8a62", "#b2182b"]
                })
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

    const discrete_categories = [
        { color: "#2166ac", label: "Muy frío" }, 
        { color: "#67a9cf", label: "Frío" },
        { color: "#d1e5f0", label: "Ligeramente frío" },
        { color: "#f7f7f7", label: "Templado" },
        { color: "#fddbc7", label: "Ligeramente caliente" },
        { color: "#ef8a62", label: "Caliente" },
        { color: "#b2182b", label: "Muy caliente" }
    ]
    
    const cat_legend = <CategoricalLegend categories={discrete_categories}/>;
    const cont_legend = <ContinuousLegend vmin={continuous_legend_data.vmin} vmax={continuous_legend_data.vmax} vcenter={continuous_legend_data.vcenter} colors={continuous_legend_data.colors}/>;
    const legend = props.cat_active ? cat_legend : cont_legend;
    const title = props.cat_active ? "Categoría de temperatura" : "Temperatura (°C)"

    return <LoadingMapWithLegend is_loading={is_loading} lon={(props.xmin + props.xmax) / 2} lat={(props.ymin + props.ymax) / 2} layers={layers} legend={legend} title={title}/>
}

export default SUHIMap;