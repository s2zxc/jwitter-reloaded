// 회원가입 화면

import React, { useState } from "react";
import { auth } from "./firebase";
import {Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount (){
    const navigate = useNavigate();
    const [isLoding, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const onChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
        
        const {target : {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); // 폼 제출시 화면이 새로고침 되는걸 막으며, 폼의 기본 작동방식을 막음
        setError("");
        if(isLoding || email === "" || password === "") return;
        try{
            setIsLoading(true); // 계정확인 진행시 submit 버튼 내용을 로딩으로 표시
            await signInWithEmailAndPassword(auth, email, password); // email, password 확인으로 기존 사용자 정보와 일치하는지 확인
            navigate("/");
        }catch(e){
            if(e instanceof FirebaseError){
                setError(e.message);
            }
            
        }finally{
            setIsLoading(false);
        }

    }
    return (
        <Wrapper>
            <Title>Log into 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
                <Input type="submit" value={isLoding ? "Loading..." : "Log in"}/>
            </Form>
            {error !== ""? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an acoount? {" "}<Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    )
}