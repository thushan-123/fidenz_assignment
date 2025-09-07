import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const auth0 = searchParams.get("auth0");

        if (token) {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("auth0", auth0);
            navigate("/home");
        } else {
            navigate("/");
        }
    }, [searchParams, navigate]);

    return <></>;
};

export default Redirect;
