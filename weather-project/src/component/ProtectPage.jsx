import {Navigate} from "react-router-dom";


const ProtectPage = ({ children }) => {
    const token = sessionStorage.getItem("token");

    if (!token) {

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectPage;
