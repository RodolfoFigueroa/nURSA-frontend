import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { MapTabsContainer } from '../../components/common';
import SUHIMap from '../../components/suhi';
import { useState } from "react";


interface SUHIPageProps {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

function SUHIPage(props: SUHIPageProps) {
    const [cat_active, set_cat_active] = useState(false);

    const tabs = <Tabs defaultActiveKey="info" className="mt-1">
        <Tab eventKey="info" title="Información">
        </Tab>
        <Tab eventKey="mitigation" title="Mitigación">
        </Tab>
        <Tab eventKey="plots" title="Gráficas">
        </Tab>
        <Tab eventKey="download" title="Descargas">
        </Tab>
    </Tabs>

    const map = <div className="h-100">
        <div className="position-relative h-75 d-flex justify-content-center align-items-center my-2">
            <SUHIMap xmin={-100.64014632} ymin={25.34400857} xmax={-99.92226795} ymax={25.99488806} year={2023} season="Qall" cat_active={cat_active}/>
        </div>
        <div className="h-25 my-2">
            <ButtonGroup>
                <ToggleButton
                    id="btn-cont"
                    type="radio"
                    name="radio"
                    value={0}
                    checked={!cat_active}
                    onChange={() => set_cat_active(false)}
                >
                    Continuo
                </ToggleButton>
                <ToggleButton
                    id="btn-cat"
                    type="radio"
                    name="radio"
                    value={0}
                    checked={cat_active}
                    onChange={() => set_cat_active(true)}
                >
                    Categórico
                </ToggleButton>
            </ButtonGroup>
        </div>
    </div>

    return <MapTabsContainer tabs={tabs} map={map}/>            
}


export default SUHIPage;