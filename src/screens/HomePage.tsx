import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { setLogout } from "../store/Features/userSlice";
import { useAppDispatch } from "../store/store";
import NotesApp from "../components/NotesApp";
import { useEffect, useState } from "react";
import { UserInfoType } from "./OtpVerification";
import { Text, Title } from "rizzui";


const HomePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType|null>(null);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("UserInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); // Parse JSON before setting state
    }
  }, []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear()
    dispatch(setLogout())
    navigate('/')
  };
  
  if (!userInfo){
    return '...'
  }
  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="container w-full my-8 md:container mx-auto  md:text-left border md:border-none m-4  p-4 md:p-0 rounded-md md:shadow-none shadow-md shadow-sky-100">
        <Title as="h4" className="">Welcome {userInfo.fName}!</Title>
        <Text as="span" className="mt- ">Email: {userInfo.email}</Text>
    
      </div>
      <div className="container sm:mx-auto w-full px-4 sm:px-0">

      <NotesApp />
      </div>
    </div>
  );
}

export default HomePage