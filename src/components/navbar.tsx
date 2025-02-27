import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import bid from "../assets/bid.png";


function MyNavbar() {
    return <Navbar className="vw-100">
        <Container>
        <Navbar.Brand href="#home">
            <img
                src={bid}
                height="30"
                className="align-left"
                alt="Inter-american Development Bank logo"
            />
        </Navbar.Brand>
        </Container>
    </Navbar>
}

export default MyNavbar;