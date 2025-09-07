import { useSearchParams , useNavigate} from "react-router-dom";

const Redirect = () => {
    const token = searchParams.get("token");

    const navigate = useNavigate();
    if (token) {
        sessionStorage.setItem("token", token);
    }else{
        navigate("/");
    }
    return(
        <>

        </>
    )
}

export default Redirect;