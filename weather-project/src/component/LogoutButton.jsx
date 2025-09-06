import { Button, Flex } from 'antd';
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
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