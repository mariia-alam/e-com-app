import { Container } from "react-bootstrap"
import { Link , useRouteError, isRouteErrorResponse } from "react-router-dom"
import  '@styles/global.css'

export default function Error() {
    const error = useRouteError();
    let errorStatus: number;
    let errorStatusText: string;
    if(isRouteErrorResponse(error)){
        errorStatus  = error.status;
        errorStatusText = error.statusText;
    }else{
        errorStatus= 404;
        errorStatusText = "Page not found";
    }
    return (
        <Container className='notFound'>
            <h1>{errorStatus}</h1>
            <p>{errorStatusText}</p>
            <Link to='/' replace={true} >Go back</Link>
        </Container>
    )
}
