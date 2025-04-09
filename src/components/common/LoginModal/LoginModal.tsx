import { Modal, Button } from "react-bootstrap";

type TModalProps = {
    show: boolean;
    onClose: () => void;
    title:string;
    body:string;
}

const LoginModal = ({show, onClose, title, body}:TModalProps) => {


    return(
        <Modal  centered show={show} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>{body}</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="" style={{backgroundColor:"var(--primary-color)", color:"white"}} onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default LoginModal