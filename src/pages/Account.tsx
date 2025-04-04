import { useAppSelector } from "@store/hooks";
import { Container } from "react-bootstrap";
const Account = () => {
    const accountInfo = useAppSelector( state => state.auth.user );

    return (
        <Container>
        <ul>
            <li>First Name: {accountInfo?.firstName}</li>
            <li>Last Name: {accountInfo?.lastName}</li>
            <li>Email: {accountInfo?.email}</li>
        </ul>
        </Container>
    )
}
export default Account;