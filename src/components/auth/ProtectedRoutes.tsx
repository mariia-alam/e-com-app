import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAppSelector((state) => state.auth);

    if (!accessToken) {
        return <Navigate to="/login?message=login_required" replace />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoutes;
