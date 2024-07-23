import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../routes/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const user = auth.currentUser;
        if(!user || isLoading || tweet === "" || tweet.length>180) return;

        try{
            setLoading(true);
            // firebase SDK의 기능으로 어떤 컬랙션에 document를 생성하고 싶은지 지정
            const doc = await addDoc(collection(db, "tweet"),{
                tweet, // 트윗내용
                createdAt:Date.now(), // 트윗게시 시간
                userName:user.displayName || "Anonymous", // 유저 이름
                userId : user.uid, // 유저 아이디(차후 삭제 기능관련해서 일치여부 판단하기 위함)

            });
            if(file){
                const locationRef = ref( // 글및 사진 게시시 데이터가 저장되는 경로 설정
                    storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`
                ); 
                const result = await uploadBytes(locationRef, file); // 업로드 되는 경로및 파일을 토대로 저장소에 업로드
                const url = await getDownloadURL(result.ref); // 이미지 다운로드 링크 생성
                await updateDoc( // 저장소 업데이트 (최종적으로 파이어베이스 데이터베이스와 스토레지 연결)
                    doc,{
                    photo : url,
                });
            }
            setTweet("");
            setFile(null);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <TextArea
                required
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