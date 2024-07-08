// 회원가입 화면

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components"
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
justify-content : center;
height : 100%;
display:flex;
flex-direction:column;
align-items:center;
width : 420px;
padding : 50px 0px;`;

const Title = styled.h1`
font-size :42px;
`;

const Form = styled.form`
margin-top : 50px;
display : flex;
flex-direction:column;
gap:10px;
width:100%;
`;

const Input = styled.input`
padding:10px 20px;
border-radius : 50px;
border : none;
width : 100%;
font-size:16px;
&[type="submit"]{
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
}
`;

const Error = styled.span`
    font-weight: 600;
    color : tomato;
`;


export default function CreateAccount (){
    const navigate = useNavigate();
    const [isLoding, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const onChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
        
        const {target : {name, value}} = e;
        if(name === "name"){
            setName(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); // 폼 제출시 화면이 새로고침 되는걸 막으며, 폼의 기본 작동방식을 막음
        if(isLoding || name === "" || email === "" || password === "") return;
        try{
            setIsLoading(true); // 계정생성 진행시 submit 버튼 내용을 로딩으로 표시
            const credentials = await createUserWithEmailAndPassword(auth, email, password); // 파이어 베이스 함수로 이메일, 비밀번호 넘길시 계정생성 (auth는 firebase.ts에서 생성한변수)
            console.log(credentials.user)

            await updateProfile(credentials.user, { // 사용자의 기본 프로필 정보 업데이트
                displayName : name
            });
            navigate("/");
        }catch(e){

        }finally{
            setIsLoading(false);
        }

    }
    return (
        <Wrapper>
            <Title>Join 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
                <Input type="submit" value={isLoding ? "Loading..." : "Create Account"}/>
            </Form>
            {error !== ""? <Error>{error}</Error> : null}
        </Wrapper>
    )
}