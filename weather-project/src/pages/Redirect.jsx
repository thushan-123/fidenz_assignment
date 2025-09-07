import { useSearchParams , useNavigate} from "react-router-dom";
import * as timers from "node:timers";

const Redirect = () => {
    const token = searchParams.get("token");

    const navigate = useNavigate();
    if (token) {
        sessionStorage.setItem("token", token);
        navigate("/home");
    }else{
        navigate("/");
    }
    return(
        <>

        </>
    )
}

export default Redirect;