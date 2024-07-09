import { Navigate } from "react-router-dom";
import { auth } from "../routes/firebase";

// App.tsx에서 home, profile 페이지를 막기위해 사용
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const user = auth.currentUser; // 현재 고객이 로그인 되어있다면 값을 채워 보내줌
    // 로그인 여부 판별로 사용

    console.log(user)
    if (!user) { // 유저 정보가 null일 경우 로그인페이지로
        return <Navigate to="/login" />;
        // user를 다른 곳으로 리다이렉트 해주는 컴포넌트
    }
    return children; //!user가 아닐경우
    // return <Layout />을 쓰는것과 같음 children은 component 내부의 모든 것임
}
{/* <Link to ="/login"></Link> -- 사용자가 클릭해서페이지를 이동하도록할때 사용 */}
{/* <Navigate to="/login"> -- 특정 경로에서 렌더링 시점에 다른 페이지로 이동시키고 싶을때 사용 */}
// Navigate("/login") 특정 코드의 실행이 끝나고 나서 페이지를 이동시킬때 사용