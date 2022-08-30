import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({setIsLoggedIn}) {
    const navigater = useNavigate();
    useEffect(()=>{
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigater('/login', {replace:true});
    }, [])

    return ( <></> );
}

export default Logout;