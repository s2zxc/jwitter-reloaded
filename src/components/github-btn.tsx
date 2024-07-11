import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../routes/firebase";
import { useNavigate } from "react-router-dom";


const Button = styled.span`
margin-top:50px;
background-color: white;
color: black;
font-weight :  500;
width: 100%;
padding: 10px 20px;
border-radius: 50px;
border: 0;
display: flex;
gap: 5px;
align-items: center;
justify-content: center;
cursor:pointer;
`;

const Logo = styled.img`
    height: 25px;
`;
// 깃허브 로그인 버튼 (create-account.tsx, login.tsx에서 사용)
export default function GithubButton(){ 
    const navigate = useNavigate(); // 깃허브 로그인후 홈화면으로 이동하기 위함 useNavigate();
    const onClick= async ()=>{
        try{
            const provider = new GithubAuthProvider(); // 깃허브 인증 수단을 사용하기 위한 함수
            //await signInWithRedirect(auth, provider); // 팝업아닌 화면이동으로 인증진행시
            await signInWithPopup(auth, provider); // 화면이동 아닌 팝업으로 인증진행시 사용 
            navigate("/");
        }catch(e){
            console.log(e);
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg"/>
            Continue with Github
        </Button>
    )
}