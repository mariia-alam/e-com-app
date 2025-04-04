import ContentLoader from "react-content-loader"
import { Row, Col } from "react-bootstrap"

export default function ProductSkeleton() {
    const renderSkeletons = Array(8).fill(0).map((_,idx) =>{
        return (
            <Col key={idx} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                <ContentLoader
                    speed={1}
                    width={150}
                    height={400}
                    viewBox="0 0 150 322"
                    backgroundColor="#e6e6e6"
                    foregroundColor="#fcfcfc"
                >
                    <rect x="12" y="203" rx="0" ry="0" width="80" height="8" /> 
                    <rect x="13" y="221" rx="0" ry="0" width="50" height="8" /> 
                    <rect x="9" y="278" rx="5" ry="5" width="129" height="27" /> 
                    <rect x="9" y="11" rx="0" ry="0" width="135" height="172" /> 
                    <rect x="12" y="191" rx="0" ry="0" width="124" height="8" /> 
                    <rect x="13" y="238" rx="0" ry="0" width="32" height="8" /> 
                    <rect x="13" y="254" rx="0" ry="0" width="23" height="7" />
                </ContentLoader>
            </Col>
        );
    })
    return (
        <Row>
            {renderSkeletons}
        </Row>
    )
}
