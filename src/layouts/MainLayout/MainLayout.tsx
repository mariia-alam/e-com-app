import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Header } from "@components/common/index";

export default function MainLayout() {

  const { container, wrapper } = styles;

  return (
    <Container className={container}>
      <Header />
          <div className={wrapper}>
            <Outlet />
          </div>
    </Container>
  );
}
