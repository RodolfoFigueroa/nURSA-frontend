import 'bootstrap/dist/css/bootstrap.min.css';
import 'maplibre-gl/dist/maplibre-gl.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import MyNavbar from './components/navbar';
import SUHIMap from './components/suhi';


function App() {
    return (
        <Container fluid className="d-flex flex-column min-vh-100 min-vw-100">
            <Row>
                <MyNavbar />
            </Row>
            <Row className="flex-grow-1 d-flex">
                <Col className="d-flex flex-column justify-content-center border">
                    <div className="position-relative h-75">
                        <SUHIMap xmin={-100.64014632} ymin={25.34400857} xmax={-99.92226795} ymax={25.99488806} year={2023} season="Qall" />
                    </div>
                </Col>
                <Col className="d-flex flex-column border">
                    <Tabs defaultActiveKey="info" className="mt-1">
                        <Tab eventKey="info" title="Información">
                        </Tab>
                        <Tab eventKey="mitigation" title="Mitigación">
                        </Tab>
                        <Tab eventKey="plots" title="Gráficas">
                        </Tab>
                        <Tab eventKey="download" title="Descargas">
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
