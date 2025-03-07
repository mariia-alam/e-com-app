import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import  '@styles/global.css'
import {LottieHandler} from "@components/feedback";


export default function Error() {


    return (
        <Container>
            <div className="d-flex flex-column align-items-center" style={{marginTop:"15%"}}>
                <LottieHandler type="notFound" message="somthing went wrong"></LottieHandler>
                <Link to='/' replace={true} >Go back to stay save</Link>
            </div>
        </Container>
    )
}
