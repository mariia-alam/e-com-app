import { Outlet } from "react-router-dom";
import { Header } from "@components/common/index";

export default function MainLayout() {


  return (
    <div className="d-flex flex-column w-100 h-100">
      <Header />
          <div>
            <Outlet />
          </div>
    </div>
  );
}
