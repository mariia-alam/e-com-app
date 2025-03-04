import { Row, Col, Container } from "react-bootstrap";

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
};

type HasID = {id?: number};

const  GridList = <T extends HasID>({records, renderItem}: GridListProps<T>) => {

    const List =
        records.length > 0
        ? records.map((record) => {
                return(
                    <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                        {renderItem(record)}
                    </Col>
                )
            })
        : "there are no List";



    return (
        <Container>
        <Row>
            {List}
        </Row>
        </Container>

    )
}

export default GridList;