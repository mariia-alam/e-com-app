import { Modal, Button } from "react-bootstrap";

type TModalProps = {
    show: boolean;
    onClose: () => void;
}

const CustomModal = ({show, onClose}:TModalProps) => {


    return(
        <Modal  centered show={show} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>If you want to continue, please log in</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="" style={{backgroundColor:"var(--primary-color)", color:"white"}} onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CustomModal