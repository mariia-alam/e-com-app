import { Row, Col, ListGroup } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
    return(
        <Row>
            <Col md={3} xs={12}>
                <ListGroup>
                    <ListGroup.Item  as={NavLink} to="" end
                    style={(props :{ isActive: boolean }) =>
                        (props as { isActive: boolean }).isActive ?
                        { backgroundColor: "var(--primary-color)", border:"none" } :
                        { color: "black" }}
                    >
                        Account Info
                    </ListGroup.Item>
                    <ListGroup.Item as={NavLink} to="orders"
                                        style={(props:{ isActive: boolean }) =>
                        (props as { isActive: boolean }).isActive ?
                        { backgroundColor: "var(--primary-color)", border:"none" } :
                        { color: "black" }}
                    >
                        Orders
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col>
                <Outlet/>
            </Col>
        </Row>
    );

}
export default ProfileLayout;