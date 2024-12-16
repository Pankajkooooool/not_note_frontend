/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import loginImage from '../assets/AuthPage.jpeg'
import { NavigateFunction, useNavigate } from 'react-router'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '../store/store';
import { compareOtp, login } from '../actions/userActions';
import { addPerson, userLoginFailed } from '../store/Features/userSlice';
import Loading from "../components/Loading";
import { Button, Input, Password, Text, Title} from "rizzui"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import AuthWrapper from "../shared/auth/auth-wrapper";
import { UserInfoType } from "./OtpVerification";
interface FormValues {
    email: string;
    password: string;
}

const SignInPage = () => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [mailSent, setMailSent] = useState<boolean>(false);

    const registrationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: registrationSchema,
        onSubmit: values => {
          if(mailSent){
            if(!values.password){
                setPasswordError("Otp is Required")
                return;
            }
            if(values.password.length<3){
                setPasswordError("Otp Must Be Atleast 4 Characters")
                return;
            }
            // const userInfo = localStorage.getItem("UserInfo")
            compareOtp(message,values.password)
            .then((res)=>{
                toast.success("Logged In Successfully");
                localStorage.setItem("token",res.data?.verifiedUser?.token);
                localStorage.setItem("UserInfo", JSON.stringify(res.data.verifiedUser));
                dispatch(addPerson(res?.data?.verifiedUser)) 
                navigate('/home')
            })
            .catch((err)=>{
                // setPasswordError("Incorrect Otp")
                setPasswordError(err.response?.data?.message || 'Incorrect Otp')
                console.error(err)
            })

          }
          else{
            setLoading(true);
            login(values).then((res: any) => {
                toast.success("Otp Sent")
                localStorage.setItem("UserInfo", JSON.stringify(res.data.user));
                setMessage(res.data.user._id);
                dispatch(addPerson(res?.data?.user)) 
                setMailSent(true);
            }).catch((err)=>{
                toast.error(err?.message||"An Error occoured");
                console.error(err)
                dispatch(userLoginFailed(err?.response?.data?.error))
            })
            .finally(()=>{

                setLoading(false);
            })
          }
        }
    });

    return (
      <AuthWrapper pageImage={loginImage}>
        <form className="w-1/3 px-9 py-5  rounded-2xl  max-md:w-full max-md:mx-10 gap-5 mx-auto"
                onSubmit={formik.handleSubmit}
            >
                <div className="justify-between max-md:text-center my-6 flex flex-col gap-2">
                    <Title>
                        Sign In
                    </Title>
                    <Text className="text-gray-500 " as="span">
                        Please Login to Continue to your account
                    </Text>
                </div>
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="martha_nielsen2003@gmail"
                    className="w-full my-4"
                    
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email?(formik.errors.email):''}
                />
                
                {/* {formik.touched.email && formik.errors.email && (
                    <Alert color="danger" className='text-custom-secondary'></Alert>
                )} */}
                {mailSent && 
                 <Password
                 label="Otp"
                 name="password"
                 placeholder="Enter Your Otp"
                 className="w-full mt-4"
                 error={passwordError}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.password}
                
             />}
               
                <Text as="small" className="w-full text-primary mb-4 underline"
                    // onClick={() => navigate('/register')}
                >
                   <Link to={'/register'} className="text-primary">Forgot Password? </Link>
                </Text>
                <Button isLoading={loading} type="submit" className="w-full mt-4"
                >
                    {mailSent?"Verify Otp":"Sign In"}
                </Button>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <Text as="small" className="mx-2 text-gray-500">or</Text>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <Button  variant="outline" className="w-full "
                >   Sign In with <FaGoogle className="ml-4"/>
                </Button>
                <Text as="small" className="w-full text-gray-500 flex md:justify-center mt-2"
                    // onClick={() => navigate('/register')}
                >
                   Need An Account?{" "} &nbsp; <Link to={'/register'} className="text-primary">Sign Up </Link>
                </Text>
            </form>
      </AuthWrapper>

    )
}

export default SignInPage