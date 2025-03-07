import ContentLoader from "react-content-loader"
import { Row, Col } from "react-bootstrap"

export default function CategorySkeleton() {
    const renderSkeletons = Array(5).fill(0).map((_,idx) =>{
        return (
            <Col key={idx} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                <ContentLoader
                    speed={1}
                    width={180}
                    height={209}
                    viewBox="0 0 180 209"
                    backgroundColor="#e6e6e6"
                    foregroundColor="#fcfcfc"
                    >
                    <circle cx="85" cy="81" r="78" />
                    <rect x="32" y="175" rx="7" ry="7" width="105" height="7" />
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
