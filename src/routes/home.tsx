import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import PostTweetForm from "../components/post-wteet-form";
import styled from "styled-components";

const Wrapper = styled.div`

`;

// 초기화면
export default function Home() {
    return (
        <Wrapper>
            <PostTweetForm/>
        </Wrapper>
        
    )
        
}