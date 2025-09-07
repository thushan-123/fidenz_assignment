import { Button, Flex } from 'antd';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LogoutButton = () => {
    const navigate = useNavigate();

    const onLogout = async () => {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        if(sessionStorage.getItem("auth0")){
            try{
                await axios.get("http://localhost:9000api/v1/user/auth0/logout")
            }catch(e){
                console.log(e);
            }finally {
                sessionStorage.removeItem('auth0');
            }
        }

        navigate('/');
    }
    return (
        <>
            <Button type="primary" danger onClick={onLogout}>
                Logout
            </Button>
        </>
    )

}

export default LogoutButton;