import { Outlet } from "react-router-dom";

// 첫페이지 출력 화면
export default function Layout(){
    return (
        <>
        <h2>layout</h2>
            <Outlet /> 
            {/* Oulet 컴포넌트로 App.tsx내 컴포넌트(화면) 출력 */}
        </>
    )
}