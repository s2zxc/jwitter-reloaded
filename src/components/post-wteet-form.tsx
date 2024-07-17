import React, { useState } from "react";
import styled from "styled-components"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder{
        font-size: 16px;
        
    }
    &:focus{ // 커서가 해당 영역에 클릭하였을 경우 색깔 변경
        outline: none;
        border-color: #1d9bf0;
    }
`;

const AttachFileButton = styled.label`
    /* 실제적인 사진게시물 버튼 역할하는 레이블 */
    padding : 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer; // 커서 포인터가 손가락으로 변경
`;

const AttachFileInput = styled.input`
    /* AttachFileInput의 레이블 css가 변경하기 편하므로 레이블만 사용하기 위해 버튼은 안보이게 설정 */
    display: none;
`;

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active{ // 마우스가 해당 위치에 도달시 색깔 변경
        opacity: 0.9;
    }
`;


export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false); // submit 버튼 클릭시 게시시간 확인용도

    const [tweet, setTweet] = useState(""); // 게시내용 입력 변수

    const [file, setFile] = useState<File | null>(null); // 파일게시 변수

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { // 게시내용 클릭핸들러
        setTweet(e.target.value);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { // 파일게시 클릭 핸들러
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }
    return (
        <Form>
            <TextArea
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={tweet}
                placeholder="What is happening"
            />
            <AttachFileButton
                htmlFor="file">{file ? "Photo added✅ " : "Add photo"}
            </AttachFileButton>
            <AttachFileInput
                onChange={onFileChange}
                id="file" type="file"
                accept="image/*"
            />
            <SubmitBtn
                type="submit"
                value={isLoading ? "Posting..." : "Post Tweet"}
            />
        </Form>
    )
}