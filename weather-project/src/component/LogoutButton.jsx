
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const {navigate} = useNavigate();

    const onLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        navigate('/');
    }
    return (
        <>

        </>
    )

}