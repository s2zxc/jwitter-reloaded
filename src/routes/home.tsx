import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

// 초기화면
export default function Home() {
    const navigate = useNavigate();
    const logOut = () =>{
        
        auth.signOut(); // signOut -> firebase의 로그아웃 기능
        // <Navigate to="/login"/>
        navigate("/login");
    }

    return (
    <h1>
        <button onClick={logOut}>Log out</button>
        </h1>
        );
}