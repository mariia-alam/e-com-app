import { LottieHandler } from "@components/feedback";
import { Row, Col, Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
    emptyMessage?: string;
};

type HasID = { id?: number };

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const GridList = <T extends HasID>({ records, renderItem, emptyMessage }: GridListProps<T>) => {
    return (
        <Container className="my-5">
            <motion.div layout variants={containerVariants} initial="hidden" animate="visible">
                <Row>
                    <AnimatePresence mode="popLayout">
                        {records.length > 0 ? (
                            records.map((record) => (
                                <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
                                    <motion.div
                                        key={record.id}
                                        layout="position"
                                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4, ease: "easeInOut" } }}
                                    >
                                        {renderItem(record)}
                                    </motion.div>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <LottieHandler type="emptyList" message={emptyMessage} />
                            </Col>
                        )}
                    </AnimatePresence>
                </Row>
            </motion.div>
        </Container>
    );
};

export default GridList;
