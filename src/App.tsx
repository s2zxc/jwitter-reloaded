import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./routes/firebase";

const router = createBrowserRouter([ // 라우터로 초기 화면 보여질 경로 설정
  {
    path: "/", // 초기 보여질 화면 layout.tsx 설정 ex) http://localhost:5173/
    element: <Layout />,
    children: [ // 해당 파라미터(children) 안에 있을 경우 layout.tsx와 함께 출력 된다.
      {
        path: "", // 경로설정이 비어있을 경우 http://localhost:5173/ 경로 일때 해당 화면을 layout.tsx와 더불어 출력
        element: <Home />
      },
      {
        path: "profile", // 경로 설정이 porfile일 경우 http://localhost:5173/profile 해당 경로이면 layout.tsx와 더불어 profile.tsx 화면 출력
        element: <Profile />
      }
    ]
  },
  {
    path: "/login", // children 밖에 있을 경우 해당 path로 넘겨주어야 아래 화면 출력 ex)http://localhost:5173/login : 특정 조건일 경우에만 해당 화면 보여주기 위함
    element: <Login />
  },
  {
    path: "/create-account", // children 밖에 있을 경우 해당 path로 넘겨주어야 아래 화면 출력 ex)http://localhost:5173/create-account
    element: <CreateAccount />

  }
])

// 기본 style 설정
// reset은 초기  css 스타일을 재설정하여 브라우저간의 일관된 스타일을 적용하기 위해 사용
const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
  background-color : black;
  color : white;
  font-family:system-ui, 
    -apple-system, 
    BlinkMacSystemFont, 
    'Segoe UI', 
    Roboto, 
    Oxygen, 
    Ubuntu, 
    Cantarell, 
    'Open Sans', 
    'Helvetica Neue', 
    sans-serif;
  }
  `;

  const Wrapper = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  `;

  function App() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 변수
  const init = async()=>{
    await auth.authStateReady();
    // 파이어 베이스 로딩 대기
    setIsLoading(false)
  }
  useEffect(()=>{ // 로딩화면 한번 호출
    init()
  }, [])

  return (
    <Wrapper>
      <GlobalStyles/>
      {/* 초기 스타일 설정 */}
      {isLoading? <LoadingScreen/> : <RouterProvider router={router} />}
      {/* 위에 설정된 라우터 화면 출력 */}
      </Wrapper>
  )
}

export default App
