import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignInPage from "./screens/SignInPage";
import RegistrationPage from "./screens/RegistrationPage";
import { useAppSelector } from "./store/store";
import HomePage from "./screens/HomePage";
import OtpVerification from "./screens/OtpVerification";
import ShareNote from "./screens/SharedNote";

const App = () => {
  let isVerified = useAppSelector(state => state.person.userInfo?.verified === true)
  // isVerified = !!localStorage.getItem("UserInfo");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isVerified ? <HomePage/> : <SignInPage/>}/>
          <Route path="/share/:id" element={<ShareNote />}/>
          <Route path="/register" element={isVerified ? <HomePage/> : <RegistrationPage/>}/>
          <Route path="/home" element={isVerified ? <HomePage/> : <SignInPage/>} />
          <Route path="/otp-verification" element={isVerified ? <HomePage/> : <OtpVerification/>}/>
          <Route path="*" element={<Navigate to={isVerified ? "/home" : '/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App